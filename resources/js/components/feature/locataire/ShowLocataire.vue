<template>

    <main class="w-full">
        <TitlePage :title="getTitlePage" />
        <section class="sm:container mx-auto p-3 bg-state-50">

            <Nav v-if="!locataire.isNewLocataire"
                :labels="[
                    {
                        nom: 'Informations locataire',
                        id: 'info_loc'
                    },
                    {
                        nom: 'Liste des contrats',
                        id : 'liste_contrat'
                    }
                ]" 
                activeItemDefault="info_loc"
            >
                <InfoLocataire ref-nav="info_loc" :locataire="locataire" deleteProps="true" />
                <ListeContrat :contrat="locataire.contrat" ref-nav="liste_contrat" :disabledCol="['loc.nom']"/>

            </Nav>

            <InfoLocataire ref-nav="info_loc" :locataire="locataire" v-else />

        </section>
    </main>

</template>
<script>

    import TitlePage from '../../utils/TitlePage.vue';
    import Nav from '../../utils/component/nav/Nav.vue';
    import InfoLocataire from './InfoLocataire.vue';
    import ListeContrat from '../contrat/ListeContrat.vue';
    
    import { useLocataireStore } from './locataireStore';
    const locataire = useLocataireStore();

    export default {
    data() {
        return {
            locataire_id: parseInt(this.$route.params.locataire_id),
            locataire,
        };
    },
    async mounted() {
        if (this.$route.params.locataire_id == 'new') {
            locataire.setNewLocataire();
        } else if (isNaN(this.locataire_id)) {
            this.$router.push({ name: "locataire_id.menu" });
        } else {
            if(!await locataire.getLocataireById(this.locataire_id) ){
                this.$router.push({ name: "locataire_id.menu" });
            }
        }
    },
    async updated(){
        if (this.$route.params.locataire_id != this.locataire_id){
            this.locataire_id = parseInt(this.$route.params.locataire_id)
            if (this.$route.params.locataire_id == 'new') {
                locataire.setNewLocataire();
            } else if (isNaN(this.locataire_id)) {
                this.$router.push({ name: "locataire.menu" });
            } else {
                if(!await locataire.getLocataireById(this.locataire_id) ){
                    this.$router.push({ name: "locataire.menu" });
                }
            }
        }
    },
    computed: {
        getTitlePage() {
            if (this.locataire.isNewLocataire) {
                return 'Nouveau locataire'
            }
            return 'Locataire '+ this.locataire.getNomLocataire
        }
    },
    components: { TitlePage, Nav, InfoLocataire, ListeContrat }
}

</script>