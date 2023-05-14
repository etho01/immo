<template>

    <main class="w-full">
        <TitlePage title="Liste des proprietaires" />

        <section class="grid grid-cols-2 sm:container mx-auto p-3 bg-state-50">
            <Select label="Genre du proprietaire" :param="genreProprio" @changeValue="changeGenre" />
            <Text label="Recherche" placeholder="Filtre le nom, email, telephone du proprietaire" @changeValue="onChangeRecherche"/>
        </section>

        <ListeProprietaire :proprio="proprio" />

    </main>

</template>
<script>
import TitlePage from '../../utils/TitlePage.vue';
import Text from '../../utils/input/Text.vue';
import Select from '../../utils/input/select.vue';
import ListeProprietaire from './ListeProprietaire.vue';

import { useProprietaireStore } from './proprioStore';
const proprio = useProprietaireStore()

import proprietaireConst from './ProprietaireConst';
const { genreProprio } = proprietaireConst()

    export default {
        data() {
            return {
                recherche: '',
                genre: undefined,
                proprio,
                genreProprio
            }
        },

        methods: {
            onChangeRecherche(text) {
                this.recherche = text;
                this.proprio.getProprietairesByFiltre(this.getFiltre);
            },
            changeGenre(value) {
                this.genre = value;
                this.proprio.getProprietairesByFiltre(this.getFiltre);
            },
        },
        computed: {
            getFiltre() {
                return {
                    recherche: this.recherche,
                    genre: this.genre
                }
            }
        },
        mounted() {
            this.proprio.getProprietairesByFiltre(this.getFiltre);
        },
        components: { TitlePage, Text, ListeProprietaire, Select }
    }

</script>