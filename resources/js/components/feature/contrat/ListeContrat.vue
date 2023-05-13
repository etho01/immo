<template>

    <ListeElement 
        :elements="contrat.getContrats" 
        :cols="ContratCols" 
        @showContrat="showContrat" 
        @gotoPage="contrat.gotoPage" 
        :page="contrat.page"
        :nbPage="contrat.nbPage"
        @newContrat="newContrat"
    />

</template>
<script>

import contratConst from './ContratConst.js';
import ListeElement from '../../utils/component/liste/ListeElement.vue';

const { ContratCols } = contratConst();

export default {
    props: ['contrat'],
    data() {
        return {
            ContratCols,
        }
    },
    methods: {
        showContrat(id) {
            this.$router.push({ name: 'contrat.show', params: { contrat_id: id } })
        },
        newContrat(){
            this.$router.push({ name: 'contrat.show', params: { contrat_id: 'new' } })
        },
    },

    components: { ListeElement }
}

</script>