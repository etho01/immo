<template>
    <main class="w-full">
        <TitlePage title="Liste des Appartements"/>
        <section class="grid grid-cols-2 sm:container mx-auto border-4 p-3 rounded bg-state-50">

        </section>

        <ListeElement :elements="apparts" :cols="appartCols"/>

    </main>

</template>
<script>
    import TitlePage from '../utils/TitlePage.vue';
    import ListeElement from '../utils/component/liste/ListeElement.vue';

    import useAppart from '../../services/appartServices.js';
    import appartConst from '../../const/AppartConst.js';

    const { appartCols } = appartConst();
    const { apparts, getApparts } = useAppart();

    export default {
        data () {
            return {
                apparts,
                appartCols
            }
        },
        mounted () {
            this.getApparts();
        },
        methods : {
            getApparts
        },
        
        components: { TitlePage, ListeElement }
    }
</script>