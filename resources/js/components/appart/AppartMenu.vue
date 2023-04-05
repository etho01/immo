<template>
    <main class="w-full">
        <TitlePage title="Liste des Appartements"/>
        <section class="grid grid-cols-2 sm:container mx-auto border-4 p-3 rounded bg-state-50">

        </section>
        <ListeAppart :apparts="apparts" />

    </main>

</template>
<script>
    import TitlePage from '../utils/TitlePage.vue';
    import ListeElement from '../utils/component/liste/ListeElement.vue';

    import useAppart from '../../services/appartServices.js';
    import ListeAppart from '../liste/ListeAppart.vue';

    const { apparts, getApparts } = useAppart();

    export default {
        data () {
            return {
                apparts
            }
        },
        mounted () {
            this.getApparts();
        },
        methods : {
            getApparts
        },
        
        components: { TitlePage, ListeElement, ListeAppart }
    }
</script>