<template>
    <main class="w-full" v-if="contrat_id != 'new'" >
        <TitlePage :title="getTitlePage"></TitlePage>
        <section class="sm:container mx-auto p-3 bg-state-50">
            <Nav  v-if="!contrat.isNewContrat" :labels="[
                                {
                                    nom : 'Infos Contrat',
                                    id : 'infos_contrat'
                                },
                                {
                                    nom : 'Infos sur l\'appartement à louer',
                                    id : 'infos_appart'
                                },
                                {
                                    nom : 'Infos sur le proprietaire',
                                    id : 'infos_proprio'
                                },
                                {
                                    nom : 'Infos sur le locataire',
                                    id : 'infos_loc'
                                },            
                                {
                                    nom: 'Depot de garantie',
                                    id: 'depotDeGarantie'
                                },                    
                                {
                                    nom : 'Etat des lieux',
                                    id : 'etat_des_lieu'
                                },
                                {
                                    nom : 'Paiements',
                                    id : 'paiment'
                                } ,                
            ]" activeItemDefault="infos_contrat">
            <InfoContrat ref-nav="infos_contrat" :contrat="contrat" deleteProps="true"  />
            <InfoAppart ref-nav="infos_appart" :appart="contrat.appart"/>
            <InfoLocataire ref-nav="infos_loc" :locataire="contrat.locataire" />
            <InfoPropio ref-nav="infos_proprio" :proprietaire="contrat.appart.proprietaire" />
            <ListeEtatDesLieu :etatDesLieu="contrat.etatDesLieu" ref-nav="etat_des_lieu" :contrat_id="contrat_id" :appart_id="contrat.appart.getAppart.id"/>
            <InfoDepotDeGarantie :depotDeGarantie="contrat.depotDeGarantie" ref-nav="depotDeGarantie" :contrat_id="contrat_id" />
            <ListePaiment :paiement="contrat.paiement" ref-nav="paiment" :contrat_id="contrat.getContrat.id"/> 
        
        </Nav>
        <InfoContrat :contrat="contrat" v-else />
        </section>
    </main>
    <main class="w-full m-3" v-else>
        <TitlePage title="Nouveau contrat"></TitlePage>
        <section class="sm:container mx-auto border-4 p-3 rounded bg-state-50">
            <InfoContrat ref-nav="infos_contrat" :contrat="contrat" />
        </section>
    </main>
</template>
<script>

    import TitlePage from '../../utils/TitlePage.vue';
    import Nav from '../../utils/component/nav/Nav.vue';

    import ListeElement from '../../utils/component/liste/ListeElement.vue';
    import InfoContrat from './InfoContrat.vue';
    import InfoAppart from '../appart/InfoAppart.vue';
    import InfoLocataire from '../locataire/InfoLocataire.vue';
    import ListeEtatDesLieu from '../etatDesLieu/ListeEtatDesLieu.vue';
    import ListePaiment from '../paiement/ListePaiment.vue';
    import InfoPropio from '../proprietaire/InfoPropio.vue';


    import { useContratStore } from './contratStore';
import InfoDepotDeGarantie from '../depotDeGarantie/InfoDepotDeGarantie.vue';
    const contrat = useContratStore()

    export default {
    data() {
        return {
            contrat_id: parseInt(this.$route.params.contrat_id),
            contrat,
        };
    },
    async mounted () {
        if (this.$route.params.contrat_id == 'new') {
            contrat.setNewContrat();
        } else if (isNaN(this.contrat_id)) {
            this.$router.push({ name: "contrat.menu" });
        } else {
            if(!await contrat.getContratById(this.contrat_id) ){
                this.$router.push({ name: "contrat.menu" });
            }
        }
    },
    async updated(){
        if (this.contrat_id != this.$route.params.contrat_id){
            this.contrat_id = parseInt(this.$route.params.contrat_id)
            if (this.$route.params.contrat_id == 'new') {
                contrat.setNewContrat();
            } else if (isNaN(this.contrat_id)) {
                this.$router.push({ name: "contrat.menu" });
            } else {
                if(!await contrat.getContratById(this.contrat_id) ){
                    this.$router.push({ name: "contrat.menu" });
                }
            }
        }
    },
    computed: {
        getTitlePage() {
            if (this.contrat.isNewContrat) {
                return 'Nouveau contrat'
            }
            return 'Contrat '+ this.contrat.getContrat.ref
        }
    },
    components: { TitlePage, Nav, ListeElement, InfoContrat, InfoAppart, InfoLocataire, ListeEtatDesLieu, ListePaiment, InfoPropio, InfoDepotDeGarantie }
}

</script>