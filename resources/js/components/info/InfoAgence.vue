<template>

    <div>
        <Error :erreurTab="erreurTab" />
        <Title title="Informations de l'agence" />
        <div class="grid grid-cols-3 mt-3">
            <Text label="Nom de l'agence" :value="getAgenceUse.nom" @changeValue="changeNom" />
            <Text label="bic de l'agence" :value="getAgenceUse.bic" @changeValue="changeBic" />
            <Text label="iban de l'agence " :value="getAgenceUse.iban" @changeValue="changeIban" />
        </div>

        <div class="mt-5 flex justify-end" v-if="agence_id != 'new'">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="updateAgenceClick">
                Modifier
            </div>
            <div class="bg-red-400 hover:bg-red-500 px-3 py-1 rounded-md ml-2 cursor-pointer" v-if="canDelete" @click="deleteAgenceClick">
                Supprimer
            </div>
        </div>
        <div v-else class="mt-5 flex justify-end">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="createAgenceClick">
                Créer
            </div>
        </div>
    </div>

</template>
<script>
import Error from '../utils/Error.vue';
import Title from '../utils/title/Title.vue';
import useAgence from '../../services/agenceServices';
import Text from '../utils/input/Text.vue';

const { getAgence, agence, createAgence, deleteAgence, updateAgence, erreurTab } = useAgence();


    export default {
    props: ["agence_id", "deleteProps", "agenceBase"],
    data() {
        return {
            erreurTab,
            agence,
            data: {
                nom: '',
                iban: '',
                bic: ''
            }
        }
    },
    methods: {
        getAgence,
        createAgence,
        deleteAgence,
        updateAgence,
        changeNom(value) {
            this.data = {...this.data, nom: value}
        },
        changeBic(value) {
            this.data = {...this.data, bic: value}
        },
        changeIban(value) {
            this.data = {...this.data, iban: value}
        },
        async createAgenceClick() {
            let idNewIdAgence = await this.createAgence(this.data)
            if (idNewIdAgence != 0){
                this.$router.push({ name: 'agence.show', params: { agence_id: idNewIdAgence } })
            } 
        },
        updateAgenceClick() {
            this.updateAgence(this.getAgenceUse.id, this.data)
        },
        async deleteAgenceClick() {
            if (await this.deleteAgence(this.getAgenceUse.id)){
                this.$router.push({ name: 'agence.menu'})
            }
        }
    },
    computed: {
            getAgenceUse() {
                if (this.agenceBase == undefined){
                    return this.agence
                }
                return this.agenceBase;
            },
            canDelete() {
                return this.deleteProps == "true"
            },
        },
    mounted(){
        if (this.agence_id != 'new' && this.agenceBase == undefined){
            this.getAgence(this.proprietaire_id)
        }
    },
    components: { Error, Title, Text }
}

</script>