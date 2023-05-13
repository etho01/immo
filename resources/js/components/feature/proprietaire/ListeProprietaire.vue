<template>

    <ListeElement 
        :elements="proprio.getProprietaires"
        :cols="proprioCols" 
        @showProprietaire="showProprietaire"  
        @newProprietaire="newProprietaire" 
        @gotoPage="proprio.gotoPage" 
        :page="proprio.page" 
        :nbPage="proprio.nbPage"
    />

</template>
<script>
import proprietaireConst from './ProprietaireConst.js';

const { proprioCols } = proprietaireConst();
import ListeElement from '../../utils/component/liste/ListeElement.vue';

export default {
    props: ['proprio'],
    data() {
        return {
            proprioCols,
        }
    },
    methods: {
        showProprietaire (id) {
            this.$router.push({ name: 'proprio.show', params: { proprio_id: id } })
        },
        newProprietaire(){
            this.$router.push({ name: 'proprio.show', params: { proprio_id: 'new' } })
        },
    },
    components: { ListeElement }
}
</script>