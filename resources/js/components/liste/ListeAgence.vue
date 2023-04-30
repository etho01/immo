<template>

    <ListeElement 
        :elements="agences"
        :cols="agenceCol" 
        @showAgence="showAgence"  
        @newAgence="newAgence" 
        @gotoPage="gotoPage" 
        :page="page" 
        :nbPage="nbPage"
    />

</template>
<script>
import ListeElement from '../utils/component/liste/ListeElement.vue';
import agenceConst from '../../const/AgenceConst.js';
import useAgence from '../../services/agenceServices';
const { agences, getAgences, page, gotoPage, nbPage } = useAgence();

const { agenceCol } = agenceConst();

    export default {
    props: ["agencesBase", "filtres"],
    data() {
        return {
            agences,
            agenceCol,
            page,
            nbPage
        }
    },
    methods: {
        showAgence (id) {
            this.$router.push({ name: 'agence.show', params: { agence_id: id } })
        },
        newAgence(){
            this.$router.push({ name: 'agence.show', params: { agence_id: 'new' } })
        },
        getAgences,
        gotoPage
    },
    computed: {
        getAgenceLoad() {
            if (this.agencesBase == undefined) {
                return this.agences
            }
            return this.agencesBase;
        }
    },
    mounted () {
        if (this.agencesBase == undefined) {
            this.getAgences(this.filtres);
        }
    },
    watch: {
        filtres: ((filtres) => {getAgences(filtres)})
    },
    components: { ListeElement }
}

</script>