<template>

    <ListeElement 
        :elements="getProprietaireLoad"
        :cols="proprioCols" 
        @showProprietaire="showProprietaire"  
        @newProprietaire="newProprietaire" 
        @gotoPage="gotoPage" 
        :page="page" 
        :nbPage="nbPage"
    />

</template>
<script>
import proprietaireConst from '../../const/ProprietaireConst.js';
import useProprietaire from '../../services/proprietaireServices.js';
const { proprietaires, getProprietaires, page, gotoPage, nbPage } = useProprietaire();

const { proprioCols } = proprietaireConst();
import ListeElement from '../utils/component/liste/ListeElement.vue';

export default {
    props: ['proprioBase','filtres'],
    data() {
        return {
            proprioCols,
            proprietaires,
            page,
            nbPage
        }
    },
    methods: {
        showProprietaire (id) {
            this.$router.push({ name: 'proprio.show', params: { proprio_id: id } })
        },
        newProprietaire(){
            this.$router.push({ name: 'proprio.show', params: { proprio_id: 'new' } })
        },
        getProprietaires,
        gotoPage
    },
    computed: {
        getProprietaireLoad() {
            if (this.proprioBase == undefined) {
                return this.proprietaires
            }
            return this.proprioBase;
        }
    },
    mounted () {
        if (this.proprioBase == undefined) {
            this.getProprietaires(this.filtres);
        }
    },
    watch: {
        filtres: ((filtres) => {getProprietaires(filtres)})
    },
    components: { ListeElement }
}
</script>