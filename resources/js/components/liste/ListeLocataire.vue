<template>

    <ListeElement :locataires="locataires" :cols="locataireCols" @showLocataire="showLocataire"/>

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
        showLocataire(id) {
            this.$router.push({ name: 'locataire.show', params: { locataire_id: id } })
        }
    },
    components: { ListeElement }
}

</script>