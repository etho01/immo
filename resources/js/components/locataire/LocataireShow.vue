<template>

    <main class="w-full m-3">
        <TitlePage :title="getNomLoc" />
        <section class="sm:container mx-auto border-4 p-3 rounded bg-state-50">

            <Nav
                :labels="[
                    {
                        nom: 'Information locataire',
                        id: 'info_loc'
                    },
                    {
                        nom: 'Liste des contrats',
                        id : 'liste_contrat'
                    }
                ]" 
                activeItemDefault="info_loc"
            >
                <LocataireInfo ref-nav="info_loc"/>
                <ListeContrat :filtres=" {locataire_id: locataire_id } " ref-nav="liste_contrat" :disabledCol="['loc.nom']"/>

            </Nav>

        </section>
    </main>

</template>
<script>

    import useLocataire from '../../services/locataireServices.js';
    import TitlePage from '../utils/TitlePage.vue';
    import Nav from '../utils/component/nav/Nav.vue';
    import LocataireInfo from './LocataireInfo.vue';
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
        }
    },
    mounted() {
        if (isNaN(this.locataire_id)) {
            this.$router.push({ name: "locataire.menu" });
        }
        this.getLocataire(this.locataire_id);
    },
    components: { TitlePage, Nav, LocataireInfo, ListeContrat }
}

</script>