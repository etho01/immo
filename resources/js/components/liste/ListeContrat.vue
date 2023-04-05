<template>

    <ListeElement :elements="contrats" :cols="ContratCols" @showAppart="showAppart"/>

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
        showAppart(id) {
            this.$router.push({ name: 'appart.show', params: { appart_id: id } })
        }
    },
    components: { ListeElement }
}

</script>