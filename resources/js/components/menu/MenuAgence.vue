<template>

    <main class="w-full">
        <TitlePage title="Liste des agences" />
        <section class="grid grid-cols-2 sm:container mx-auto p-3 bg-state-50">

            <Text label="Recherche" />

        </section>

        <ListeAgence :filtres="getFiltres" />
    </main>

</template>
<script>
import ListeAgence from '../liste/ListeAgence.vue';
import TitlePage from '../utils/TitlePage.vue';
import Text from '../utils/input/Text.vue';


    export default {
        data() {
            return {
                recherche: ''
            }
        },
        methods: {
            onChangeRecherche(value) {
                this.recherche = value;
            }
        },
        computed: {
            getFiltres() {
                return {
                    recherche: this.recherche
                }
            }
        },
        components: { TitlePage, Text, ListeAgence }
    }

</script>