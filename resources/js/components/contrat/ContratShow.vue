<template>
    <main class="w-full m-3" >
        <TitlePage :title="'Contrat '+contrat_id"></TitlePage>
        <section class="sm:container mx-auto border-4 p-3 rounded bg-state-50">
            <Nav :labels="[
                                {
                                    nom : 'Infos Contrat',
                                    id : 'infos_contrat'
                                },
                                {
                                    nom : 'Infos sur l\'appart louer',
                                    id : 'infos_appart'
                                },
                                {
                                    nom : 'Infos sur le locataire',
                                    id : 'infos_loc'
                                },                                
                                {
                                    nom : 'Etat des lieu',
                                    id : 'etat_des_lieu'
                                },
                                {
                                    nom : 'Paiments',
                                    id : 'paiment'
                                }                                
            ]" activeItemDefault="infos_contrat">
            <ContratInfo ref-nav="infos_contrat"/>
            <AppartInfo ref-nav="infos_appart"/>
            <LocataireInfo ref-nav="infos_loc" />
            <ListeEtatDesLieu :filtres="{contrat_id: this.contrat_id}"  ref-nav="etat_des_lieu"/>
            <ListePaiment :filtres="{contrat_id: this.contrat_id}"  ref-nav="paiment"/>
        
        </Nav>
        </section>
    </main>
</template>
<script>

    import userContrat from '../../services/contratServices.js';
    import TitlePage from '../utils/TitlePage.vue';
    import Nav from '../utils/component/nav/Nav.vue';

    import ListeElement from '../utils/component/liste/ListeElement.vue';
    import ContratInfo from './ContratInfo.vue';
    import AppartInfo from '../appart/AppartInfo.vue';
    import LocataireInfo from '../locataire/LocataireInfo.vue';
import ListeEtatDesLieu from '../liste/ListeEtatDesLieu.vue';
import ListePaiment from '../liste/ListePaiment.vue';

    const { contrat, getContrat } = userContrat()

    export default {
    data() {
        return {
            contrat_id: parseInt(this.$route.params.contrat_id),
            contrat,
        };
    },
    mounted() {
        if (isNaN(this.contrat_id)) {
            this.$router.push({ name: "contrat.menu" });
        }
        this.getContrat(this.contrat_id);
    },
    methods: {
        getContrat,
    },
    components: { TitlePage, Nav, ListeElement, ContratInfo, AppartInfo, LocataireInfo, ListeEtatDesLieu, ListePaiment }
}

</script>