<template>
    <main class="w-full">
        <TitlePage title="Liste des appartements"/>
        <section class="grid grid-cols-2 sm:container mx-auto p-3 bg-state-50">

                <SelectAgence @changeValue="onChangeAgence"/>

                <Text label="Recherche" placeholder="Filtre sur l'adresse, le nom, le pays de l'appartement" @changeValue="onChangeRecherche"/>

        </section>
        <ListeAppart :filtres="getFiltres" />

    </main>

</template>
<script>
    import TitlePage from '../utils/TitlePage.vue';
    import ListeElement from '../utils/component/liste/ListeElement.vue';
    import Text from '../utils/input/Text.vue';
    import Select from '../utils/input/select.vue';


    import ListeAppart from '../liste/ListeAppart.vue';
import SelectAgence from '../select/SelectAgence.vue';


    export default {

        data() {
            return {
                agence_id: -1,
                recherche: '',
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
        components: { TitlePage, ListeElement, ListeAppart, Select, Text, SelectAgence }
    }
</script>