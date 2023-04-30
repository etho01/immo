<template>

    <main class="w-full">
        <TitlePage title="Liste des proprietaires" />

        <section class="grid grid-cols-2 sm:container mx-auto p-3 bg-state-50">

            <Text label="Recherche" placeholder="Filtre le nom, email, telephone du proprietaire" @changeValue="onChangeRecherche"/>
        </section>

        <ListeProprietaire :filtres="getFiltre" />

    </main>

</template>
<script>
import TitlePage from '../utils/TitlePage.vue';
import Text from '../utils/input/Text.vue';
import ListeProprietaire from '../liste/ListeProprietaire.vue';


    export default {
        data() {
            return {
                recherche: '',
            }
        },

        methods: {
            onChangeRecherche(text) {
                this.recherche = text;
            },
        },
        computed: {
            getFiltre() {
                return {
                    recherche: this.recherche
                }
            }
        },
        components: { TitlePage, Text, ListeProprietaire }
    }

</script>