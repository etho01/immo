<template>

    <ListeElement :elements="getEtatDesLieusLoad" :cols="etatDesLieuCols" />

</template>
<script>
import ListeElement from '../utils/component/liste/ListeElement.vue';

import useEtatDesLieu from '../../services/etatDesLieuServices.js';
const { etatDesLieus, getEtatDesLieus } = useEtatDesLieu();

import etatDesLieuConst from '../../const/EtatDesLieuConst.js';
const { etatDesLieuCols } = etatDesLieuConst();


export default {
    props: ['etatDesLieuBase','filtres'],
    data (){
        return {
            etatDesLieus,
            etatDesLieuCols
        }
    },
    methods : {
        getEtatDesLieus
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
    components: { ListeElement }
}

</script>