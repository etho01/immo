<template>
    <main class="w-full">
        <TitlePage title="Liste des locataires"/>
        <section class="grid grid-cols-2 sm:container mx-auto p-3 bg-state-50">
            <Select label="Genre du locataire" :param="genreLoc" @changeValue="changeGenreLoc" />

            <Text label="Recherche" placeholder="Filtre le nom, email, telephone du locataire" @changeValue="onChangeRecherche"/>
        </section>

        <ListeLocataire :filtres="getFiltre"/>

    </main>
</template>
<script>
    import TitlePage from '../utils/TitlePage.vue';

    import ListeLocataire from '../liste/ListeLocataire.vue';

    import locataireConst from '../../const/LocataireConst.js';
    import Text from '../utils/input/Text.vue';
    import Select from '../utils/input/select.vue';


    const { genreLoc } = locataireConst();

    export default {
        data() {
            return {
                genreLoc,

                genreLocFiltre: '',
                recherche: '',
            }
        },
        methods: {
            changeGenreLoc(value) {
                this.genreLocFiltre = value
            },
            onChangeRecherche(text) {
                this.recherche = text;
            },
        },
        computed: {
            getFiltre() {
                return {
                    genre: this.genreLocFiltre,
                    recherche: this.recherche
                }
            }
        },
        components: { TitlePage, ListeLocataire, Select, Text }
    }
</script>