<template>

    <ListeElement :elements="getLocatairesLoad" :cols="locataireCols" @showLocataire="showLocataire"  @gotoPage="gotoPage" :page="page" :nbPage="nbPage" @newLocataire="newLocataire" />

</template>
<script>

import locataireConst from '../../const/LocataireConst.js';
import useLocataire from '../../services/locataireServices.js';
const { locataires, getLocataires, page, gotoPage, nbPage } = useLocataire();

const { locataireCols } = locataireConst();
import ListeElement from '../utils/component/liste/ListeElement.vue';

export default {
    props: ['locatairesBase','filtres'],
    data() {
        return {
            locataireCols,
            locataires,
            page,
            nbPage
        }
    },
    methods: {
        showLocataire(id) {
            this.$router.push({ name: 'locataire.show', params: { locataire_id: id } })
        },
        newLocataire(){
            this.$router.push({ name: 'locataire.show', params: { locataire_id: 'new' } })
        },
        getLocataires,
        gotoPage
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