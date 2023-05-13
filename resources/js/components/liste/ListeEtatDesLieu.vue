<template>

<div>
    <ListeElement 
        :elements="etatDesLieu.getEtatDesLieus" 
        :cols="etatDesLieuCols" 
        @gotoPage="etatDesLieu.gotoPage" 
        :page="etatDesLieu.page" 
        :nbPage="etatDesLieu.nbPage" 
        @showEtaDesLieu="showEtaDesLieu" 
        @createEtatDesLieu="createEtatDesLieu" 
    />
    <Modal ref="modalEtatDesLieu" :title="getTitleModal">
        <InfoEtatDesLieu 
            :etatDesLieu="etatDesLieu" 
            deleteProps="true" 
            @refresh="refresh" 
            :appart_id="appart_id" 
            :contrat_id="contrat_id" 
        />
    </Modal>
</div>

</template>
<script>
import ListeElement from '../utils/component/liste/ListeElement.vue';
import etatDesLieuConst from '../../const/EtatDesLieuConst.js';
import Modal from '../utils/component/modal/Modal.vue';
import InfoEtatDesLieu from '../info/InfoEtatDesLieu.vue';
const { etatDesLieuCols } = etatDesLieuConst();


export default {
    props: ['etatDesLieu', "contrat_id", 'appart_id'],
    data (){
        return {
            etatDesLieuCols,
        }
    },
    methods : {
        showEtaDesLieu(etatDesLieu) {
            this.etatDesLieu.getEtatDesLieuByObj(etatDesLieu)
            this.$refs.modalEtatDesLieu.toogle()
        },
        createEtatDesLieu() {
            this.etatDesLieu.setNewEtatDesLieu()
            this.$refs.modalEtatDesLieu.toogle()
        },
        refresh() {
            this.etatDesLieu.getEtatDesLieusByFiltre({contrat_id: this.contrat_id});
            this.$refs.modalEtatDesLieu.toogle();
        }
    },
    components: { ListeElement, Modal, InfoEtatDesLieu }
}

</script>