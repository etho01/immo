<template>
    <main class="w-full" v-if="contrat_id != 'new'" >
        <TitlePage :title="'Contrat '+contrat_id"></TitlePage>
        <section class="sm:container mx-auto p-3 bg-state-50">
            <Nav :labels="[
                                {
                                    nom : 'Infos Contrat',
                                    id : 'infos_contrat'
                                },
                         /*       {
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
                                    nom : 'Etat des lieux',
                                    id : 'etat_des_lieu'
                                },
                                {
                                    nom : 'Paiements',
                                    id : 'paiment'
                                }        */                        
            ]" activeItemDefault="infos_contrat">
            <InfoContrat ref-nav="infos_contrat" :contrat="contrat" deleteProps="true"  />
       <!--     <InfoAppart ref-nav="infos_appart" :appartBase="contrat.appart"/>
            <InfoLocataire ref-nav="infos_loc" :locataireBase="contrat.locataire" />
            <InfoPropio ref-nav="infos_proprio" :proprietaireBase="getProprietaire" />
            <ListeEtatDesLieu :filtres="{contrat_id: this.contrat_id}"  ref-nav="etat_des_lieu" :contrat_id="contrat_id" :appart_id="getAppartId"/>
            <ListePaiment :filtres="{contrat_id: this.contrat_id}" :contrat_id="contrat_id" ref-nav="paiment"/> -->
        
        </Nav>
        </section>
    </main>
    <main class="w-full m-3" v-else>
        <TitlePage title="Nouveau contrat"></TitlePage>
        <section class="sm:container mx-auto border-4 p-3 rounded bg-state-50">
            <InfoContrat ref-nav="infos_contrat" :contrat_id="contrat_id" />
        </section>
    </main>
</template>
<script>

    import TitlePage from '../utils/TitlePage.vue';
    import Nav from '../utils/component/nav/Nav.vue';

    import ListeElement from '../utils/component/liste/ListeElement.vue';
    import InfoContrat from '../info/InfoContrat.vue';
    import InfoAppart from '../info/InfoAppart.vue';
    import InfoLocataire from '../info/InfoLocataire.vue';
    import ListeEtatDesLieu from '../liste/ListeEtatDesLieu.vue';
    import ListePaiment from '../liste/ListePaiment.vue';
import InfoPropio from '../info/InfoPropio.vue';

  //  const { contrat, getContrat } = userContrat()

    import { useContratStore } from '../../store/contratStore';
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
    },
    components: { TitlePage, Nav, ListeElement, InfoContrat, InfoAppart, InfoLocataire, ListeEtatDesLieu, ListePaiment, InfoPropio }
}

</script>