<template>

    <ListeElement :elements="getContratLoad" :cols="ContratCols" @showContrat="showContrat" @gotoPage="gotoPage" :page="page" :nbPage="nbPage"/>

</template>
<script>

import contratConst from '../../const/ContratConst.js';
import ListeElement from '../utils/component/liste/ListeElement.vue';
import userContrat from '../../services/contratServices.js';
const { contrats, getContrats, page, gotoPage, nbPage } = userContrat();

const { ContratCols } = contratConst();

export default {
    props: ['contratsBase','filtres'],
    data() {
        return {
            ContratCols,
            contrats,
            page,
            nbPage
        }
    },
    methods: {
        showContrat(id) {
            this.$router.push({ name: 'contrat.show', params: { contrat_id: id } })
        },
        getContrats,
        gotoPage
    },
    computed: {
        getContratLoad() {
            if (this.contratsBase == undefined) {
                return this.contrats
            }
            return this.contratsBase;
        }
    },
    mounted() {
        if (this.contratsBase == undefined) {
            this.getContrats(this.filtres)
        } else {
            this.contrats = this.contratsBase;
        }
    },
    watch: {
        filtres: ((filtres) => {getContrats(filtres)})
    },

    components: { ListeElement }
}

</script>