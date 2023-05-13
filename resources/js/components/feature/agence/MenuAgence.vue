<template>

    <main class="w-full">
        <TitlePage title="Liste des agences" />
        <section class="grid grid-cols-2 sm:container mx-auto p-3 bg-state-50">

            <Text label="Recherche" @changeValue="onChangeRecherche" />

        </section>

        <ListeAgence :agence="agence" />
    </main>

</template>
<script>
import ListeAgence from './ListeAgence.vue';
import TitlePage from '../../utils/TitlePage.vue';
import Text from '../../utils/input/Text.vue';

import { useAgenceStore } from './agenceStore';
const agence = useAgenceStore()

    export default {
        data() {
            return {
                recherche: '',
                agence
            }
        },
        methods: {
            onChangeRecherche(value) {
                this.recherche = value;
                this.agence.getAgencesByFiltre(this.getFiltres);
            }
        },
        computed: {
            getFiltres() {
                return {
                    recherche: this.recherche
                }
            }
        },
        mounted() {
            this.agence.getAgencesByFiltre(this.getFiltres);
        },
        components: { TitlePage, Text, ListeAgence }
    }

</script>