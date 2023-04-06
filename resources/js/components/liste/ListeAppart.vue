<template>

    <ListeElement :elements="getAppartsLoad" :cols="appartCols" @show-appart="showAppart"/>

</template>
<script>

import appartConst from '../../const/AppartConst.js';
import useAppart from '../../services/appartServices.js';

const { apparts, getApparts } = useAppart();

const { appartCols } = appartConst();
import ListeElement from '../utils/component/liste/ListeElement.vue';

export default {
    props: ['appartsBase','filtres'],
    data() {
        return {
            appartCols,
            apparts
        }
    },
    methods: {
        showAppart(id) {
            this.$router.push({ name: 'appart.show', params: { appart_id: id } })
        },
        getApparts
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