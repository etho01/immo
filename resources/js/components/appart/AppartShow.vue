<template>

    <main class="w-full m-3">
        <TitlePage title="Appart" />

        <section class="sm:container mx-auto border-4 p-3 rounded bg-state-50">

            <Nav
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
                    id: 'liste_etat_des_lieu'
                }
            ]" activeItemDefault="slow_appart">

            <AppartInfo ref-nav="slow_appart"/>
            <ListeContrat :filtres="{'appart_id': appart_id }" ref-nav="contrat_liste"/>
            <ListeElement :elements="etatDesLieus" ref-nav="liste_etat_des_lieu" :cols="etatDesLieuCols"/>
            </Nav>

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
        mounted () {
            this.getAppart(this.appart_id)
            this.getEtatDesLieus({
                'appart_id': this.appart_id
            });
        },
        components : { TitlePage, Nav, AppartInfo, ListeElement, ListeContrat }
    }

</script>