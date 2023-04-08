<template>
    <div>
        <Title title="Information contrat" />
        <div class="grid grid-cols-2 mt-3">
            <Text type="date" label="Date de debut" :value="contrat.date_debut" @changeValue="changeDateDebut"/>
            <Text type="date" label="Date de fin" :value="contrat.date_fin" @changeValue="chnageDateFin"/>
        </div>
        <div class="mt-5 flex justify-end">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="updateContratClick">
                Modifier
            </div>
            <div class="bg-red-400 hover:bg-red-500 px-3 py-1 rounded-md ml-2 cursor-pointer" v-if="canDelete" @click="deleteContratClick">
                Supprimer
            </div>
        </div>
    </div>

</template>
<script>

    import userContrat from '../../services/contratServices';
    import Text from '../utils/input/Text.vue';
    import Title from '../utils/title/Title.vue';
    const { getContrat, contrat, updateContrat, deleteContrat } = userContrat();

    export default {
        props: ['contrat_id', 'deleteProps'],
        data() {
            return {
                contrat,

                date_debut: contrat.date_debut,
                date_fin: contrat.date_fin
            }
        },
        methods : {
            getContrat,
            updateContrat,
            deleteContrat,
            changeDateDebut(newDateDebut){
                this.date_debut = newDateDebut;
            },
            chnageDateFin(newDateFin){
                this.date_fin = newDateFin;
            },
            updateContratClick(){
                this.updateContrat(this.contrat_id, {
                    date_debut: this.date_debut,
                    date_fin: this.date_fin
                });
            },
            deleteContratClick() {
                this.deleteContrat(this.contrat_id);
            }
        },
        mounted() {
            this.getContrat(this.contrat_id);
        },
        computed: {
            canDelete() {
                return this.deleteProps == "true"
            }
        },
        components: { Title, Text }

    }

</script>