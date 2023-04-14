<template>

<div>
    <ListeElement :elements="getEtatDesLieusLoad" :cols="etatDesLieuCols" @gotoPage="gotoPage" :page="page" :nbPage="nbPage" @showEtaDesLieu="showEtaDesLieu" @createEtatDesLieu="createEtatDesLieu" />
    <Modal ref="modalEtatDesLieu">
        <EtatDesLieuInfo :EtatDesLieuBase="etatDesLieuLoad"  deleteProps="true" @refresh="refresh" :etartdeslieu_id="etatDesLieuIdLoad" :appart_id="appart_id" :contrat_id="contrat_id" />
    </Modal>
</div>

</template>
<script>
import ListeElement from '../utils/component/liste/ListeElement.vue';

import useEtatDesLieu from '../../services/etatDesLieuServices.js';
const { etatDesLieus, getEtatDesLieus, page, gotoPage, nbPage } = useEtatDesLieu();

import etatDesLieuConst from '../../const/EtatDesLieuConst.js';
import Modal from '../utils/component/modal/Modal.vue';
import EtatDesLieuInfo from '../etatDesLieu/EtatDesLieuInfo.vue';
const { etatDesLieuCols } = etatDesLieuConst();


export default {
    props: ['etatDesLieuBase','filtres', "contrat_id", 'appart_id'],
    data (){
        return {
            etatDesLieus,
            etatDesLieuCols,
            page,
            nbPage,
            etatDesLieuLoad : undefined,
            etatDesLieuIdLoad: undefined,
        }
    },
    methods : {
        getEtatDesLieus,
        gotoPage,
        showEtaDesLieu(etatDesLieu) {
            this.etatDesLieuLoad = etatDesLieu
            this.etatDesLieuIdLoad=undefined
            this.$refs.modalEtatDesLieu.toogle()
        },
        createEtatDesLieu() {
            this.etatDesLieuLoad=undefined;
            this.etatDesLieuIdLoad='new'
            this.$refs.modalEtatDesLieu.toogle()
        },
        refresh() {
            this.getEtatDesLieus(this.filtres);
            this.$refs.modalEtatDesLieu.toogle();
        }
    },
    computed: {
        getEtatDesLieusLoad(){
            if (this.etatDesLieuBase == undefined) {
                return this.etatDesLieus;
            }
            return this.etatDesLieuBase;
        }
    },
    mounted() {
        if (this.etatDesLieuBase == undefined){
            this.getEtatDesLieus(this.filtres);
        }
    },
    watch: {
        filtres: ((filtres) => {getEtatDesLieus(filtres)})
    },
    components: { ListeElement, Modal, EtatDesLieuInfo }
}

</script>