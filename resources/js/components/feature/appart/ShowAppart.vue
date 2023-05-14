<template>

    <main class="w-full">
        <TitlePage :title="getTitreAppart" />

        <section class="sm:container mx-auto p-3 bg-state-50">

            <Nav v-if="!appart.isNewAppart"
            :labels="[
                {
                    nom: 'Informations appartement',
                    id: 'slow_appart'
                },
                {
                    nom: 'informations proprietaire',
                    id: 'show_proprio'
                },
                {
                    nom: 'Liste des contrats',
                    id: 'contrat_liste'
                },
            /*    {
                    nom: 'Etat des lieux',
                    id: 'etat_des_lieu'
                }*/
            ]" activeItemDefault="slow_appart"
            >
                <AppartInfo ref-nav="slow_appart" deleteProps="true" :appart="appart"/>
                <InfoPropio :proprietaire="appart.proprietaire" ref-nav="show_proprio" />
                <ListeContrat :contrat="appart.contrat" ref-nav="contrat_liste"/>
               <!-- <ListeEtatDesLieu :filtres="{appart_id: appart_id}" ref-nav="etat_des_lieu" :appart_id="appart_id" />-->
            </Nav>
            <AppartInfo ref-nav="slow_appart" :appart="appart" v-else/>

        </section>

    </main>

</template>
<script>
import TitlePage from '../../utils/TitlePage.vue';
import Nav from '../../utils/component/nav/Nav.vue';
import AppartInfo from './InfoAppart.vue';
import ListeElement from '../../utils/component/liste/ListeElement.vue';
import ListeContrat from '../contrat/ListeContrat.vue';
import ListeEtatDesLieu from '../etatDesLieu/ListeEtatDesLieu.vue';
import InfoPropio from '../proprietaire/InfoPropio.vue';

import { useAppartStore } from './appartStore';

const appart = useAppartStore();

    export default {
        data () {
            return {
                appart_id: parseInt(this.$route.params.appart_id),
                appart,
            }
        },
        async mounted () {
            if (this.$route.params.appart_id == 'new'){
                this.appart.setNewAppart()
            } else if (isNaN(this.appart_id)) {
                this.$router.push({ name: "appart.menu" });
            } else {
                if (! await this.appart.getAppartById(this.appart_id)){
                    this.$router.push({ name: "appart.menu" });
                }
            }
        },
        async updated(){
            this.appart_id = parseInt(this.$route.params.appart_id);
            if (this.$route.params.appart_id == 'new'){
                this.appart.setNewAppart()
            } else if (isNaN(this.appart_id)) {
                this.$router.push({ name: "appart.menu" });
            } else {
                if (! await this.appart.getAppartById(this.appart_id)){
                    this.$router.push({ name: "appart.menu" });
                }
            }
        },
        components : { TitlePage, Nav, AppartInfo, ListeElement, ListeContrat, ListeEtatDesLieu, InfoPropio }
    }

</script>