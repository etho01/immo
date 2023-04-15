<template>

    <div>
        <Title title="Adresse du bien" />
        <div class="grid grid-cols-6 mt-3">
            <Text class="col-span-3" label="Adresse du bien" :value="getAppartUse.adresse" @changeValue="changeAdresse" placeholder="Adresse"/>
            <Text class="col-span-3" label="Adresse compementaire du bien" :value="getAppartUse.adresse_compl" @changeValue="changeComp" placeholder="Adresse complementaire"/>

            <Text class="col-span-2" label="Code postal" placeholder="Code postal" :value="getAppartUse.cp" @changeValue="changeCp" />
            <Text class="col-span-2" label="Departement" placeholder="Departement"/>
            <Text class="col-span-2" label="Pays du bien" placeholder="Pays" :value="getAppartUse.pays" @changeValue="changePays" />

        </div>
        <Title title="Finance du bien" />
        <div class="grid grid-cols-2 mt-3">
            <Text label="Loyer du bien" :value="getAppartUse.loyer" @changeValue="changeLoyer" />
            <Text label="Charge du bien" :value="getAppartUse.charge" @changeValue="changeCharge" />
        </div>
        <Title title="Agence du bien" />
        <div class="grid grid-cols-1 mt-3">
            <SelectAgence @changeValue="changeAgence" :valueDefault="getIdAgence" />
        </div>
        <div class="mt-5 flex justify-end" v-if="appart_id != 'new'">
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
import Text from '../utils/input/Text.vue';
import Title from '../utils/title/Title.vue';
import useAppart from '../../services/appartServices';
import SelectAgence from '../select/SelectAgence.vue';

const { getAppart, appart, createAppart, deleteAppart, updateAppart } = useAppart();

    export default {
        props: ['appart_id', 'deleteProps', 'appartBase'],
        data() {
            return {
                appart,
                data: {
                    adresse: undefined,
                    adresse_compl: undefined,
                    cp : undefined,
                    pays: undefined,
                    loyer : undefined,
                    charge: undefined,
                    agence_id: undefined
                }
            }
        },
        methods: {
            getAppart,
            updateAppart,
            deleteAppart,
            createAppart,
            updateAppartClick() {
                this.updateAppart(this.getAppartUse.id, this.getData);
            },
            async deleteAppartClick() {
                if (await this.deleteAppart(this.getAppartUse.id)){
                    this.$router.push({ name: 'appart.menu'})
                }
            },
            async createAppartClick() {
                let idNewAppart = await this.createAppart(this.getData);
                if (idNewAppart != 0){
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
            }
        },
        computed: {
            getAppartUse() {
                if (this.appartBase == undefined){
                    return this.appart
                }
                return this.appartBase
            },
            getIdAgence() {
                if (this.getAppartUse.agence != undefined) {
                    return this.getAppartUse.agence.id;
                }
            },
            getData() {
                return this.data
            },
            canDelete() {
                return this.deleteProps == "true"
            },
        },
        mounted() {
            if (this.appart_id != 'new' && this.appartBase == undefined){
                this.getAppart(this.appart_id);
            }
        },
        components: { Title, Text, SelectAgence }
    }

</script>