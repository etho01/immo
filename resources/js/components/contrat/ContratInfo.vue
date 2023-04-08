<template>
    <div>
        <Title title="Information contrat" />
        <div class="grid grid-cols-2 mt-3">
            <Text type="date" label="Date de debut" :value="contrat.date_debut" @changeValue="changeDateDebut"/>
            <Text type="date" label="Date de fin" :value="contrat.date_fin" @changeValue="chnageDateFin"/>
        </div>
        <div v-if="contrat_id == 'new'" class="grid grid-cols-2 mt-3">
            <SelectAppart @changeValue="changeAppart">

            </SelectAppart>
            <SelectLocataire @changeValue="chnageLocataire"></SelectLocataire>
        </div>
        <div class="mt-5 flex justify-end" v-if="contrat_id != 'new'">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="updateContrat(contrat_id, getData);">
                Modifier
            </div>
            <div class="bg-red-400 hover:bg-red-500 px-3 py-1 rounded-md ml-2 cursor-pointer" v-if="canDelete" @click="this.deleteContrat(contrat_id, $router);">
                Supprimer
            </div>
        </div>
        <div v-else class="mt-5 flex justify-end">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="this.createContrat(getData, $router)">
                Créer
            </div>
        </div>
    </div>

</template>
<script>

import userContrat from '../../services/contratServices';
    import Text from '../utils/input/Text.vue';
    import Title from '../utils/title/Title.vue';
import SelectAppart from '../select/SelectAppart.vue';
import SelectLocataire from '../select/SelectLocataire.vue';
    const { getContrat, contrat, updateContrat, deleteContrat, createContrat } = userContrat();

    export default {
        props: ['contrat_id', 'deleteProps'],
        data() {
            return {
                contrat,

                date_debut: contrat.date_debut,
                date_fin: contrat.date_fin,
                appart_id: undefined,
                locataire_id: undefined
            }
        },
        methods : {
            getContrat,
            updateContrat,
            deleteContrat,
            createContrat, 
            changeDateDebut(newDateDebut){
                this.date_debut = newDateDebut;
            },
            chnageDateFin(newDateFin){
                this.date_fin = newDateFin;
            },
            changeAppart(id){
                this.appart_id = id
            },
            chnageLocataire(id){
                this.locataire_id = id
            },
        },
        mounted() {
            if (this.contrat_id != 'new'){
                this.getContrat(this.contrat_id);
            }
        },
        computed: {
            canDelete() {
                return this.deleteProps == "true"
            },
            getData() {
                return {
                    date_debut: this.date_debut,
                    date_fin: this.date_fin,
                    appart_id: this.appart_id,
                    locataire_id: this.locataire_id
                }
            }
        },
        components: { Title, Text, SelectAppart, SelectLocataire }

    }

</script>