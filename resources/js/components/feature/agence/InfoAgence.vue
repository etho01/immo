<template>

    <div>
        <Error :erreurTab="agence.erreurTab" />
        <Title title="Informations de l'agence" />
        <div class="grid grid-cols-3 mt-3">
            <Text label="Nom de l'agence" :value="agence.getAgence.nom" @changeValue="changeNom" />
            <Text label="bic de l'agence" :value="agence.getAgence.bic" @changeValue="changeBic" />
            <Text label="iban de l'agence " :value="agence.getAgence.iban" @changeValue="changeIban" />
        </div>

        <div class="mt-5 flex justify-end" v-if="!agence.isNewAgence">
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
import Error from '../../utils/Error.vue';
import Title from '../../utils/title/Title.vue';
import Text from '../../utils/input/Text.vue';


    export default {
    props: ["agence", "deleteProps"],
    data() {
        return {
            data: {
                nom: undefined,
                iban: undefined,
                bic: undefined
            }
        }
    },
    methods: {
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
            let idNewIdAgence = await this.agence.createAgence(this.data)
            if (idNewIdAgence != 0){
                this.$router.push({ name: 'agence.show', params: { agence_id: idNewIdAgence } })
            } 
        },
        updateAgenceClick() {
            this.agence.updateAgence(this.data)
        },
        async deleteAgenceClick() {
            if (await this.agence.deleteAgence()){
                this.$router.push({ name: 'agence.menu'})
            }
        }
    },
    computed: {
        canDelete() {
            return this.deleteProps == "true"
        },
    },
    components: { Error, Title, Text }
}

</script>