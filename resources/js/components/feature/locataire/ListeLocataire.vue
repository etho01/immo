<template>

    <ListeElement 
        :elements="locataire.getLocataires" 
        :cols="locataireCols" 
        @showLocataire="showLocataire"  
        @gotoPage="locataire.gotoPage" 
        :page="locataire.page" 
        :nbPage="locataire.nbPage" 
        @newLocataire="newLocataire" 
    />

</template>
<script>

import locataireConst from './LocataireConst.js';
const { locataireCols } = locataireConst();
import ListeElement from '../../utils/component/liste/ListeElement.vue';

export default {
    props: ['locataire'],
    data() {
        return {
            locataireCols,
        }
    },
    methods: {
        showLocataire(id) {
            this.$router.push({ name: 'locataire.show', params: { locataire_id: id } })
        },
        newLocataire(){
            this.$router.push({ name: 'locataire.show', params: { locataire_id: 'new' } })
        },
    },
    components: { ListeElement }
}

</script>