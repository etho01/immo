<template>
    <main class="w-full">
        <TitlePage title="Liste des Appartements"/>
        <section class="grid grid-cols-2 sm:container mx-auto border-4 p-3 rounded bg-state-50">

                <Select label="Agence" :param="agences" @changeValue="onChangeAgence"/>

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

    import useAgence from '../../services/agenceServices.js';
    const { agences, getAgences } = useAgence();

    import ListeAppart from '../liste/ListeAppart.vue';


    export default {

        data() {
            return {
                agences,

                agence_id: -1,
                recherche: '',
            }
        },
        methods: {
            getAgences,
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

        mounted() {
            this.getAgences();
        },
        
        components: { TitlePage, ListeElement, ListeAppart, Select, Text }
    }
</script>