<template>
    <main class="w-full">
        <TitlePage title="Liste des contrats"/>
        <section class="grid grid-cols-2 sm:container mx-auto p-3 bg-state-50">
            <SelectAgence @changeValue="onChangeAgence" />

            <Text label="Recherche" placeholder="Filtre sur l'adresse de l'appartement et le nom du locataire" @changeValue="onChangeRecherche"/>
            <Select label="Statut" @changeValue="changeStatut" :param="statutContrat" />
            <Select label="Satut du solde" @changeValue="changeStatutSolde" :param="statutSoldeContrat" />
        </section>

        <ListeContrat :contrat="contrat"/>

    </main>

</template>

<script>
    import TitlePage from '../../utils/TitlePage.vue';
    import Text from '../../utils/input/Text.vue';
    import Select from '../../utils/input/select.vue';

    import ListeContrat from './ListeContrat.vue';
    import SelectAgence from '../agence/SelectAgence.vue';

    import { useContratStore } from './contratStore';
    const contrat = useContratStore()

    import contratConst from './ContratConst.js';
    const { statutContrat, statutSoldeContrat } = contratConst();

    export default {
        data() {
            return {
                agence_id: -1,
                recherche: '',
                statut: undefined,
                statut_solde: undefined,
                contrat,
                statutContrat,
                statutSoldeContrat
            }
        },
        methods: {
            onChangeRecherche(text) {
                this.recherche = text;
                this.contrat.getContratsByFiltre(this.getFiltres)
            },
            onChangeAgence(agence_id){
                this.agence_id = agence_id;
                this.contrat.getContratsByFiltre(this.getFiltres)
            },
            changeStatut(statut) {
                this.statut = statut;
                this.contrat.getContratsByFiltre(this.getFiltres)
            },
            changeStatutSolde(statut){
                this.statut_solde = statut;
                this.contrat.getContratsByFiltre(this.getFiltres)
            }            
        },
        computed: {
            getFiltres() {
                return {
                    recherche: this.recherche,
                    agence_id: this.agence_id,
                    statut: this.statut,
                    statut_solde: this.statut_solde
                }
            }
        },
        mounted() {
            this.contrat.getContratsByFiltre(this.getFiltres)
        },
        components: { TitlePage, Text, Select, ListeContrat, SelectAgence }
}
</script>