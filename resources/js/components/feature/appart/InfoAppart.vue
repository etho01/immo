<template>

    <div>
        <Error :erreurTab="appart.erreurTab" />
        <Title title="Adresse du bien" />
        <div class="grid grid-cols-6 mt-3">
            <Text class="col-span-3" label="Adresse du bien" :value="appart.getAppart.adresse" @changeValue="changeAdresse" placeholder="Adresse"/>
            <Text class="col-span-3" label="Adresse compementaire du bien" :value="appart.getAppart.adresse_compl" @changeValue="changeComp" placeholder="Adresse complementaire"/>

            <Text class="col-span-2" label="Code postal" placeholder="Code postal" :value="appart.getAppart.cp" @changeValue="changeCp" />
            <Text class="col-span-2" label="Departement" placeholder="Departement" :value="appart.getAppart.departement" @changeValue="changeDep"/>
            <Text class="col-span-2" label="Pays du bien" placeholder="Pays" :value="appart.getAppart.pays" @changeValue="changePays" />

        </div>
        <Title title="Finance du bien" />
        <div class="grid grid-cols-2 mt-3">
            <Text label="Loyer du bien" :value="appart.getAppart.loyer" @changeValue="changeLoyer" />
            <Text label="Charge du bien" :value="appart.getAppart.charge" @changeValue="changeCharge" />
        </div>
        <div v-if="appart.isNewAppart">
            <Title title="Agence du bien" />
            <div class="grid grid-cols-1 mt-3">
                <SelectProprio @changeValue="changeProprio" :valueDefault="getidProprio"/>
                <SelectAgence @changeValue="changeAgence" :valueDefault="getIdAgence" />
            </div>
        </div>
        <div class="mt-5 flex justify-end" v-if="!appart.isNewAppart">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="updateAppartClick">
                Modifier
            </div>
            <div class="bg-red-400 hover:bg-red-500 px-3 py-1 rounded-md ml-2 cursor-pointer" v-if="canDelete" @click="deleteAppartClick">
                Supprimer
            </div>
        </div>
        <div v-else class="mt-5 flex justify-end">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="createAppartClick">
                Créer
            </div>
        </div>
    </div>

</template>
<script>
import Text from '../../utils/input/Text.vue';
import Title from '../../utils/title/Title.vue';
import SelectAgence from '../agence/SelectAgence.vue';
import Error from '../../utils/Error.vue';
import SelectProprio from '../proprietaire/SelectProprio.vue';
import successMessageStore from '../../navbar/SuccessMessageStore';

    export default {
        props: ['appart', 'deleteProps'],
        data() {
            return {
                data: {
                    adresse: undefined,
                    adresse_compl: undefined,
                    cp : undefined,
                    pays: undefined,
                    departement: undefined,
                    loyer : undefined,
                    charge: undefined,
                    agence_id: undefined
                },
            }
        },
        methods: {
            async updateAppartClick() {
                if (await this.appart.updateAppart( this.getData)) {
                    successMessageStore.addSuccessMessage('L\'appartement a été modifié ')
                }
            },
            async deleteAppartClick() {
                if (await this.appart.deleteAppart()){
                    successMessageStore.addSuccessMessage('L\'appartement a été suprimé ')
                    this.$router.push({ name: 'appart.menu'})
                }
            },
            async createAppartClick() {
                let idNewAppart = await this.appart.createAppart(this.getData);
                if (idNewAppart != 0){
                    successMessageStore.addSuccessMessage('L\'appartement a été créé ')
                    this.$router.push({ name: 'appart.show', params: { appart_id: idNewAppart } })
                }
            },
            changeCharge(value) {
                this.data = {...this.data, charge: value}
            },
            changeLoyer(value) {
                this.data = {...this.data, loyer: value}
            },
            changePays(value) {
                this.data = {...this.data, pays: value}
            },
            changeCp(value) {
                this.data = {...this.data, cp: value}
            },
            changeComp(value) {
                this.data = {...this.data, adresse_compl: value}
            },
            changeAdresse(value) {
                this.data = {...this.data, adresse: value}
            },
            changeAgence(value){
                this.data = {...this.data, agence_id: value}
            },
            changeDep(value) {
                this.data = {...this.data, departement: value}
            },
            changeProprio (value) {
                this.data = {...this.data, proprietaire_id: value}
            }
        },
        computed: {
            getData() {
                return this.data
            },
            canDelete() {
                return this.deleteProps == "true"
            },
        },
        components: { Title, Text, SelectAgence, Error, SelectProprio }
    }

</script>