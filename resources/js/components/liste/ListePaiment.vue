<template>

    <ListeElement :elements="getPaimentLoad" :cols="paiementCols"/>

</template>
<script>
import ListeElement from '../utils/component/liste/ListeElement.vue';

import paiementConst from '../../const/PaiementConst.js';
const { paiementCols } = paiementConst();

import usePaiement from '../../services/paimentServices.js';
const { getPaiements, paiements } = usePaiement();

export default {
    props: ['paiementBase','filtres'],
    data (){
        return {
            paiementCols,
            paiements
        }
    },
    methods : {
        getPaiements
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
    components: { ListeElement }
}

</script>