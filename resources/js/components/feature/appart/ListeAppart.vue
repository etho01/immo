<template>

    <ListeElement 
        :elements="appart.getApparts" 
        :cols="appartCols" 
        @show-appart="showAppart" 
        @gotoPage="appart.gotoPage" 
        :page="appart.page" 
        :nbPage="appart.nbPage" 
        @newAppart="newAppart" 
    />

</template>
<script>

import appartConst from './AppartConst.js';
const { appartCols } = appartConst();

import ListeElement from '../../utils/component/liste/ListeElement.vue';

export default {
    props: ['appart'],
    data() {
        return {
            appartCols,
        }
    },
    methods: {
        showAppart(id) {
            this.$router.push({ name: 'appart.show', params: { appart_id: id } })
        },
        newAppart(){
            this.$router.push({ name: 'appart.show', params: { appart_id: 'new' } })
        },
    },
    components: { ListeElement }
}

</script>