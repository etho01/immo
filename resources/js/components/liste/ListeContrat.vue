<template>

    <ListeElement :elements="contrats" :cols="ContratCols" @showContrat="showContrat"/>

</template>
<script>

import contratConst from '../../const/ContratConst.js';

const { ContratCols } = contratConst();
import ListeElement from '../utils/component/liste/ListeElement.vue';

export default {
    props: ['contrats'],
    data() {
        return {
            ContratCols
        }
    },
    methods: {
        showContrat(id) {
            this.$router.push({ name: 'contrat.show', params: { contrat_id: id } })
        }
    },
    components: { ListeElement }
}

</script>