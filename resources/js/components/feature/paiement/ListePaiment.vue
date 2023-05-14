<template>

    <div>
        <ListeElement 
            :elements="paiement.getPaiements" 
            :cols="paiementCols" 
            @gotoPage="paiement.gotoPage" 
            :page="paiement.page" 
            :nbPage="paiement.nbPage" 
            @showPaiement="showPaiement" 
            @createPaiement="createPaiement" 
        />
       <Modal ref="modalPayment" :title="getTitleModal">
            <InfoPaiement 
                deleteProps="true" 
                :paiement="paiement"
                @refresh="refresh"
                :contrat_id="contrat_id"
            />
        </Modal>
    </div>

</template>
<script>
import ListeElement from '../../utils/component/liste/ListeElement.vue';

import paiementConst from './PaiementConst.js';
const { paiementCols } = paiementConst();

import Modal from '../../utils/component/modal/Modal.vue';
import InfoPaiement from './InfoPaiement.vue';

export default {
    props: ['paiement', 'contrat_id'],
    data (){
        return {
            paiementCols,
        }
    },
    methods : {
        showPaiement(paiement) {
            this.paiement.getPaiementByObj(paiement)
            this.$refs.modalPayment.toogle()
        },
        createPaiement(){
            this.paiement.setNewPaiement();
            this.$refs.modalPayment.toogle()
        },
        refresh() {
            this.paiement.getPaiementsByFiltre({contrat_id: this.contrat_id})
            this.$refs.modalPayment.toogle();
        }
    },
    computed: {
        getTitleModal() {
            if (this.paiement.isNewPaiement) {
                return 'Nouveau paiement'
            }
            return 'Paiement'
        }
    },
    components: { ListeElement, Modal, InfoPaiement }
}

</script>