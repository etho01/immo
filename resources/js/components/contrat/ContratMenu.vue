<template>
    <main class="w-full">
        <TitlePage title="Liste des Contrats"/>
        <section class="grid grid-cols-2 sm:container mx-auto border-4 p-3 rounded bg-state-50">
            <Select label="Agence" :param="agences" @change="onChangeAgence"/>

            <Text label="test" @change="onChangeRecherche"/>
        </section>

        <ListeContrat :filtres="getFiltres"/>

    </main>

</template>

<script>

    import useAgence from '../../services/agenceServices.js';
    import TitlePage from '../utils/TitlePage.vue';
    import Text from '../utils/input/Text.vue';
    import Select from '../utils/input/select.vue';

    import ListeContrat from '../liste/ListeContrat.vue';

    const { agences, getAgences } = useAgence();


    export default {
        data() {
            return {
                agences,
                paramsTest: [{
                        id: 1,
                        name: 'dsd',
                    }
                ],

                agence_id: -1,
                recherche: '',
            }
        },
        mounted() {
            getAgences();
        },
        methods: {
            onChangeRecherche(text) {
                this.recherche = text;
            },
            onChangeAgence(agence_id){
                this.agence_id = agence_id;
            }
        },
        computed: {
            getFiltres() {
                return {
                    recherche: this.recherche,
                    agence_id: this.agence_id
                }
            }
        },
        components: { TitlePage, Text, Select, ListeContrat }
}
</script>