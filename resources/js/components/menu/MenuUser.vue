<template>

    <main class="w-full" >
        <TitlePage title="Liste des utilisateurs" />
        <section class="grid grid-cols-2 sm:container mx-auto p-3 bg-state-50">
            <Text label="Recherche" />
        </section>
        <ListeUser :filtres="getFiltre" />

    </main>

</template>
<script>
import ListeUser from '../liste/ListeUser.vue';
import TitlePage from '../utils/TitlePage.vue';
import Text from '../utils/input/Text.vue';


    export default {
        data() {
            return {
                recherche:''
            }
        },
        methods: {
            onChangeRecherche(value) {
                this.recherche = value;
            }
        },
        computed: {
            getFiltre() {
                return {
                    recherche: this.recherche
                }
            }
        },
        components: { TitlePage, Text, ListeUser }
    }

</script>