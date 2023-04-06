<template>
    <main class="w-full">
        <TitlePage title="Liste des locataires"/>
        <section class="grid grid-cols-2 sm:container mx-auto border-4 rounded p-3 bg-state-50">

        </section>

        <ListeLocataire />

    </main>
</template>
<script>
    import TitlePage from '../utils/TitlePage.vue';

    import ListeLocataire from '../liste/ListeLocataire.vue';



    export default {

        components: { TitlePage, ListeLocataire }
    }
</script>