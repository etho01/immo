<template>
    <main class="w-full">
        <TitlePage title="Liste des contrats"/>
        <section class="grid grid-cols-2 sm:container mx-auto p-3 bg-state-50">
            <SelectAgence @changeValue="onChangeAgence" />

            <Text label="Recherche" placeholder="Filtre sur l'adresse de l'appartement et le nom du locataire" @changeValue="onChangeRecherche"/>
        </section>

        <ListeContrat :filtres="getFiltres"/>

    </main>

</template>

<script>
    import TitlePage from '../utils/TitlePage.vue';
    import Text from '../utils/input/Text.vue';
    import Select from '../utils/input/select.vue';
    import userStore from '../../store/userStore';

    import ListeContrat from '../liste/ListeContrat.vue';
    import SelectAgence from '../select/SelectAgence.vue';


    export default {
        data() {
            return {
                agence_id: -1,
                recherche: '',
                userStore
            }
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
        components: { TitlePage, Text, Select, ListeContrat, SelectAgence }
}
</script>