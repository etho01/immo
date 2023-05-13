<template>
    <main class="w-full">
        <TitlePage title="Liste des appartements"/>
        <section class="grid grid-cols-2 sm:container mx-auto p-3 bg-state-50">

                <SelectAgence @changeValue="onChangeAgence"/>

                <Text label="Recherche" placeholder="Filtre sur l'adresse, le nom, le pays de l'appartement" @changeValue="onChangeRecherche"/>

        </section>
        <ListeAppart :appart="appart" />

    </main>

</template>
<script>
    import TitlePage from '../../utils/TitlePage.vue';
    import ListeElement from '../../utils/component/liste/ListeElement.vue';
    import Text from '../../utils/input/Text.vue';
    import Select from '../../utils/input/select.vue';


    import ListeAppart from './ListeAppart.vue';
    import SelectAgence from '../agence/SelectAgence.vue';

    import { useAppartStore } from './appartStore';
    const appart = useAppartStore();

    export default {

        data() {
            return {
                agence_id: -1,
                recherche: '',

                appart
            }
        },
        methods: {
            onChangeRecherche(text) {
                this.recherche = text;
                this.appart.getAppartsByFiltre(this.getFiltres);
            },
            onChangeAgence(agence_id){
                this.agence_id = agence_id;
                this.appart.getAppartsByFiltre(this.getFiltres);
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
        mounted () {
            this.appart.getAppartsByFiltre(this.getFiltres);
        },
        components: { TitlePage, ListeElement, ListeAppart, Select, Text, SelectAgence }
    }
</script>