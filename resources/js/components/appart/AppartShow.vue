<template>

    <main class="w-full m-3">
        <TitlePage title="Appart" />

        <section class="sm:container mx-auto border-4 p-3 rounded bg-state-50">

            <Nav v-if="appart_id != 'new'"
            :labels="[
                {
                    nom: 'Informations appartement',
                    id: 'slow_appart'
                },
                {
                    nom: 'Liste des contrats',
                    id: 'contrat_liste'
                },
                {
                    nom: 'Etat des lieu',
                    id: 'etat_des_lieu'
                }
            ]" activeItemDefault="slow_appart">

            <AppartInfo ref-nav="slow_appart" :appart_id="appart_id" deleteProps="true" :appartBase="appart"/>
            <ListeContrat :filtres="{appart_id: appart_id }" ref-nav="contrat_liste"/>
            <ListeEtatDesLieu :filtres="{appart_id: appart_id}" ref-nav="etat_des_lieu" />
            </Nav>
            <AppartInfo ref-nav="slow_appart" :appart_id="appart_id" v-else/>

        </section>

    </main>

</template>
<script>
import TitlePage from '../utils/TitlePage.vue';
import Nav from '../utils/component/nav/Nav.vue';
import AppartInfo from './AppartInfo.vue';
import ListeElement from '../utils/component/liste/ListeElement.vue';
import userContrat from '../../services/contratServices.js';
import useAppart from '../../services/appartServices.js';
import useEtatDesLieu from '../../services/etatDesLieuServices.js';

import etatDesLieuConst from '../../const/EtatDesLieuConst.js';
import ListeContrat from '../liste/ListeContrat.vue';
import ListeEtatDesLieu from '../liste/ListeEtatDesLieu.vue';

const { etatDesLieuCols } = etatDesLieuConst();

const { getEtatDesLieus, etatDesLieus } = useEtatDesLieu();
const { getAppart, appart } = useAppart();

    export default {
        data () {
            return {
                appart_id: parseInt(this.$route.params.appart_id),
                etatDesLieus,
                appart,
                etatDesLieuCols
            }
        },
        methods: {
            getEtatDesLieus,
            getAppart
        },
        async mounted () {
            if (this.$route.params.appart_id == 'new'){
                this.appart_id = "new"
            } else if (isNaN(this.appart_id)) {
                this.$router.push({ name: "appart.menu" });
            } else {
                if (! await this.getAppart(this.appart_id)){
                    this.$router.push({ name: "appart.menu" });
                }
            }
        },
        updated(){
            if (this.$route.params.appart_id != this.appart_id){
                this.appart_id = this.$route.params.appart_id
            }
        },
        components : { TitlePage, Nav, AppartInfo, ListeElement, ListeContrat, ListeEtatDesLieu }
    }

</script>