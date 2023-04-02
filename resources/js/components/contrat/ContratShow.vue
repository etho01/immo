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
            <div ref-nav="infos_contrat"></div>
            <div ref-nav="infos_appart"></div>
            <div ref-nav="infos_loc"></div>
            <ListeElement :elements="contrat.etat_des_lieu" ref-nav="etat_des_lieu" :cols="etatDesLieuCols"/>
            <ListeElement :elements="contrat.paiement" ref-nav="paiment" :cols="paiementCols"/>
        
        </Nav>
        </section>
    </main>
</template>
<script>

    import userContrat from '../../services/contratServices.js';
    import TitlePage from '../utils/TitlePage.vue';
    import Nav from '../utils/component/nav/Nav.vue';

    import ListeElement from '../utils/component/liste/ListeElement.vue';
    import paiementConst from '../../const/PaiementConst.js'
    import etatDesLieuConst from '../../const/EtatDesLieuConst.js'

    const { paiementCols } = paiementConst();
    const { etatDesLieuCols } = etatDesLieuConst();

    const { contrat, getContrat } = userContrat()

    export default {
    data() {
        return {
            contrat_id: parseInt(this.$route.params.id_contrat),
            contrat,
            paiementCols,
            etatDesLieuCols
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
    components: { TitlePage, Nav, ListeElement }
}

</script>