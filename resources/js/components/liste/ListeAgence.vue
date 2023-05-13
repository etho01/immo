<template>

    <ListeElement 
        :elements="agence.getAgences"
        :cols="agenceCol" 
        @showAgence="showAgence"  
        @newAgence="newAgence" 
        @gotoPage="agence.gotoPage" 
        :page="agence.page" 
        :nbPage="agence.nbPage"
    />

</template>
<script>
import ListeElement from '../utils/component/liste/ListeElement.vue';
import agenceConst from '../../const/AgenceConst.js';
const { agenceCol } = agenceConst();

    export default {
    props: ["agence"],
    data() {
        return {
            agenceCol,
        }
    },
    methods: {
        showAgence (id) {
            this.$router.push({ name: 'agence.show', params: { agence_id: id } })
        },
        newAgence(){
            this.$router.push({ name: 'agence.show', params: { agence_id: 'new' } })
        },
    },
    components: { ListeElement }
}

</script>