<template>

    <ListeElement :elements="getAppartsLoad" :cols="appartCols" @show-appart="showAppart" @gotoPage="gotoPage" :page="page" :nbPage="nbPage"/>

</template>
<script>

import appartConst from '../../const/AppartConst.js';
import useAppart from '../../services/appartServices.js';

const { apparts, getApparts, page, gotoPage, nbPage } = useAppart();

const { appartCols } = appartConst();
import ListeElement from '../utils/component/liste/ListeElement.vue';

export default {
    props: ['appartsBase','filtres'],
    data() {
        return {
            appartCols,
            apparts,
            page,
            nbPage
        }
    },
    methods: {
        showAppart(id) {
            this.$router.push({ name: 'appart.show', params: { appart_id: id } })
        },
        getApparts,
        gotoPage
    },
    computed: {
        getAppartsLoad() {
            if (this.appartsBase == undefined) {
                return this.apparts
            }
            return this.appartsBase;
        }
    },
    mounted () {
        if (this.appartsBase == undefined) {
            this.getApparts(this.filtres);
        }
    },
    watch: {
        filtres: ((filtres) => {getApparts(filtres)})
    },
    components: { ListeElement }
}

</script>