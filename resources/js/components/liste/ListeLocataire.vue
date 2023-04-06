<template>

    <ListeElement :elements="getLocatairesLoad" :cols="locataireCols" @showLocataire="showLocataire"/>

</template>
<script>

import locataireConst from '../../const/LocataireConst.js';
import useLocataire from '../../services/LocataireServices.js';
const { locataires, getLocataires } = useLocataire();

const { locataireCols } = locataireConst();
import ListeElement from '../utils/component/liste/ListeElement.vue';

export default {
    props: ['locatairesBase','filtres'],
    data() {
        return {
            locataireCols,
            locataires
        }
    },
    methods: {
        showLocataire(id) {
            this.$router.push({ name: 'locataire.show', params: { locataire_id: id } })
        },
        getLocataires
    },
    computed: {
        getLocatairesLoad() {
            if (this.locatairesBase == undefined) {
                return this.locataires
            }
            return this.locatairesBase;
        }
    },
    mounted () {
        if (this.locatairesBase == undefined) {
            this.getLocataires(this.filtres);
        }
    },
    watch: {
        filtres: ((filtres) => {getLocataires(filtres)})
    },
    components: { ListeElement }
}

</script>