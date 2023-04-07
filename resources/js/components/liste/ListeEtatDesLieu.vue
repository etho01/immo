<template>

    <ListeElement :elements="getEtatDesLieusLoad" :cols="etatDesLieuCols" @gotoPage="gotoPage" :page="page" :nbPage="nbPage"/>

</template>
<script>
import ListeElement from '../utils/component/liste/ListeElement.vue';

import useEtatDesLieu from '../../services/etatDesLieuServices.js';
const { etatDesLieus, getEtatDesLieus, page, gotoPage, nbPage } = useEtatDesLieu();

import etatDesLieuConst from '../../const/EtatDesLieuConst.js';
const { etatDesLieuCols } = etatDesLieuConst();


export default {
    props: ['etatDesLieuBase','filtres'],
    data (){
        return {
            etatDesLieus,
            etatDesLieuCols,
            page,
            nbPage
        }
    },
    methods : {
        getEtatDesLieus,
        gotoPage
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