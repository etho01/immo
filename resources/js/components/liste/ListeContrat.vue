<template>

    <ListeElement :elements="contrats" :cols="ContratCols" @showContrat="showContrat"/>

</template>
<script>

import contratConst from '../../const/ContratConst.js';
import ListeElement from '../utils/component/liste/ListeElement.vue';
import userContrat from '../../services/contratServices.js';
const { contrats, getContrats } = userContrat();

const { ContratCols } = contratConst();

export default {
    props: ['contratsBase','filtres'],
    data() {
        return {
            ContratCols,
            contrats
        }
    },
    methods: {
        showContrat(id) {
            this.$router.push({ name: 'contrat.show', params: { contrat_id: id } })
        }
    },
    mounted () {
        if (this.contratsBase)
    }
    components: { ListeElement }
}

</script>