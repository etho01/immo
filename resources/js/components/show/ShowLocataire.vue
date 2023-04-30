<template>

    <main class="w-full">
        <TitlePage :title="getTitreLocataire" />
        <section class="sm:container mx-auto p-3 bg-state-50">

            <Nav v-if="locataire_id != 'new'"
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
                <InfoLocataire ref-nav="info_loc" :locataireBase="locataire" deleteProps="true" />
                <ListeContrat :filtres=" {locataire_id: locataire_id } " ref-nav="liste_contrat" :disabledCol="['loc.nom']"/>

            </Nav>

            <InfoLocataire ref-nav="info_loc" :locataire_id="locataire_id" v-else />

        </section>
    </main>

</template>
<script>

    import useLocataire from '../../services/locataireServices.js';
    import TitlePage from '../utils/TitlePage.vue';
    import Nav from '../utils/component/nav/Nav.vue';
    import InfoLocataire from '../info/InfoLocataire.vue';
    import ListeContrat from '../liste/ListeContrat.vue';

    const { locataire, getLocataire } = useLocataire();
    

    export default {
    data() {
        return {
            locataire_id: parseInt(this.$route.params.locataire_id),
            locataire,
        };
    },
    methods: {
        getLocataire
    },
    computed: {
        getNomLoc(){
            return this.locataire.nom + ' ' + this.locataire.prenom;
        },
        getTitreLocataire() {
            if (this.locataire_id == "new") {
                return "Nouveau locataire"
            }
            return this.getNomLoc
        }
    },
    async mounted() {
        if (this.$route.params.locataire_id == 'new'){
            this.locataire_id = "new"
        } else if (isNaN(this.locataire_id)) {
            this.$router.push({ name: "locataire.menu" });
        } else {
            if (!await this.getLocataire(this.locataire_id)){
                this.$router.push({ name: "locataire.menu" });
            }
        }
    },
        updated(){
            if (this.$route.params.locataire_id != this.locataire_id){
                this.locataire_id = this.$route.params.locataire_id
                this.getLocataire(this.locataire_id)
            }
        },
    components: { TitlePage, Nav, InfoLocataire, ListeContrat }
}

</script>