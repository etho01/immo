<template>

    <ListeElement :locataires="locataires" :cols="locataireCols"/>

</template>
<script>

import locataireConst from '../../const/LocataireConst.js';

const { locataireCols } = locataireConst();
import ListeElement from '../utils/component/liste/ListeElement.vue';

export default {
    props: ['locataires'],
    data() {
        return {
            locataireCols
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