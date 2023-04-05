<template>

    <ListeElement :elements="apparts" :cols="appartCols" @showAppart="showAppart"/>

</template>
<script>

import appartConst from '../../const/AppartConst.js';

const { appartCols } = appartConst();
import ListeElement from '../utils/component/liste/ListeElement.vue';

export default {
    props: ['apparts'],
    data() {
        return {
            appartCols
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