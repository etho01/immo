<template>

    <div>
        <ListeElement :elements="getPaimentLoad" :cols="paiementCols" @gotoPage="gotoPage" :page="page" :nbPage="nbPage" @showPaiement="showPaiement" @createPaiement="createPaiement" />
        <Modal ref="modalPayment">
            <PaiementInfo deleteProps="true" @refresh="refresh" :paiementBase="paimentLoad" :paiement_id="paiementIdLoad" />
        </Modal>
    </div>

</template>
<script>
import ListeElement from '../utils/component/liste/ListeElement.vue';

import paiementConst from '../../const/PaiementConst.js';
const { paiementCols } = paiementConst();

import usePaiement from '../../services/paimentServices.js';
import Modal from '../utils/component/modal/Modal.vue';
import PaiementInfo from '../paiement/PaiementInfo.vue';
const { getPaiements, paiements, page, gotoPage, nbPage } = usePaiement();

export default {
    props: ['paiementBase','filtres'],
    data (){
        return {
            paiementCols,
            paiements,
            page,
            nbPage,
            paimentLoad : undefined,
            paiementIdLoad: undefined
        }
    },
    methods : {
        getPaiements,
        gotoPage,
        showPaiement(paiement) {
            this.paimentLoad = paiement
            this.paiementIdLoad = undefined;
            this.$refs.modalPayment.toogle()
        },
        createPaiement(){
            this.paimentLoad = undefined;
            this.paiementIdLoad='new';
            this.$refs.modalPayment.toogle()
        },
        refresh() {
            this.getPaiements(this.filtres);
            this.$refs.modalPayment.toogle();
        }
    },
    computed: {
        getPaimentLoad() {
            if (this.paiementBase == undefined) {
                return this.paiements
            }
            return this.paiementBase
        }
    },
    mounted() {
        if (this.paiementBase == undefined){
            this.getPaiements(this.filtres);
        }
    },
    watch: {
        filtres: ((filtres) => {getPaiements(filtres)})
    },
    components: { ListeElement, Modal, PaiementInfo }
}

</script>