<template>
    <main class="w-full">
        <TitlePage title="Liste des Contrats"/>
        <section class="grid grid-cols-2 sm:container mx-auto border-4 p-3 rounded bg-state-50">
            <Select label="Agence" :param="agences" @change="onChangeAgence"/>

            <Text label="test" @change="onChangeRecherche"/>
        </section>

        <ListeElement :elements="contrats" :cols="ContratCols"/>

    </main>

</template>

<script>

    import userContrat from '../../services/contratServices.js';
    import useAgence from '../../services/agenceServices.js';
    import TitlePage from '../utils/TitlePage.vue';
    import Text from '../utils/input/Text.vue';
    import Select from '../utils/input/select.vue';
    import ListeElement from '../utils/component/liste/ListeElement.vue';

    import contratConst from '../../const/ContratConst';

    const { contrats, getContrats } = userContrat();
    const { agences, getAgences } = useAgence();

    const { ContratCols } = contratConst();

    export default {
        data() {
            return {
                contrats,
                agences,
                paramsTest: [{
                        id: 1,
                        name: 'dsd',
                    }
                ],
                ContratCols,

                agence_id: -1,
                recherche: '',
            }
        },
        mounted() {
            getContrats();
            getAgences();
        },
        methods: {
            onChangeRecherche(text) {
                this.recherche = text;
                this.refreshContrat();
            },
            onChangeAgence(agence_id){
                this.agence_id = agence_id;
                this.refreshContrat()
            },
            refreshContrat(){
                getContrats({
                    recherche: this.recherche,
                    agence_id: this.agence_id
                })
            },
        },
        components: { TitlePage, Text, Select, ListeElement }
}
</script>