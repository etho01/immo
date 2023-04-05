<template>
    <main class="w-full">
        <TitlePage title="Liste des locataires"/>
        <section class="grid grid-cols-2 sm:container mx-auto border-4 rounded p-3 bg-state-50">

        </section>

        <ListeLocataire :elements="locataires"/>

    </main>
</template>
<script>
    import TitlePage from '../utils/TitlePage.vue';

    import useLocataire from '../../services/LocataireServices.js';
    import locataireConst from '../../const/LocataireConst.js';
    import ListeLocataire from '../liste/ListeLocataire.vue';

    const { locataireCols } = locataireConst()

    const { locataires, getLocataires } = useLocataire();

    export default {
        data() {
            return {
                locataires,
                locataireCols
            }
        },
        mounted () {
            this.getLocataires();
        },
        methods : {
            getLocataires
        },
        components: { TitlePage, ListeLocataire }
    }
</script>