<template>

<div>
        <Error :erreurTab="proprietaire.erreurTab" />
        <Title title="Informations Proprietaire" />
        <div class="grid grid-cols-3 mt-3">
            <Text label="Prénom du Proprietaire" :value="proprietaire.getProprietaire.prenom" @changeValue="changePrenom" placeholder="Prénom du Proprietaire" />
            <Text label="Nom du Proprietaire " :value="proprietaire.getProprietaire.nom" @changeValue="changeNom" placeholder="Nom du Proprietaire"/>
            <Text label="Date de naissance" :value="proprietaire.getProprietaire.date_naissance" @changeValue="changeDateNaissance" type="date" />
            <Text label="Email" :value="proprietaire.getProprietaire.email" @changeValue="changeEmail" placeholder="Email du Proprietaire" />
            <Text label="Télèphone" :value="proprietaire.getProprietaire.telephone" @changeValue="changeTelephone" placeholder="Télèphone" />
            <Select :param="genreProprio" label="Genre du Proprietaire" @changeValue="changeGenre" :valueDefault="proprietaire.getProprietaire.genre" />
        </div>
        <Title title="Adresse" />
        <div class="grid grid-cols-3 mt-3">
            <Text label="adresse" :value="proprietaire.getProprietaire.adresse" placeholder="adresse" @changeValue="changeAdresse" />
            <Text label="code postal" :value="proprietaire.getProprietaire.cp" placeholder="code postal" @changeValue="changeCp" />
            <Text label="ville" :value="proprietaire.getProprietaire.ville" placeholder="ville" @changeValue="changeVille" />
        </div>
        <Title title="Informations bancaires Proprietaire" />
        <div class="grid grid-cols-2 mt-3">
            <Text label="Iban" placeholder="Iban" @changeValue="changeIban" :value="proprietaire.getProprietaire.iban" />
            <Text label="Bic" placeholder="Bic" @changeValue="changeBic" :value="proprietaire.getProprietaire.bic" />
        </div>
        <div class="mt-5 flex justify-end" v-if="!proprietaire.isNewProprietaire">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="updateProprietaireClick">
                Modifier
            </div>
            <div class="bg-red-400 hover:bg-red-500 px-3 py-1 rounded-md ml-2 cursor-pointer" v-if="canDelete" @click="deleteProprietaireClick">
                Supprimer
            </div>
        </div>
        <div v-else class="mt-5 flex justify-end">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="createProprietaireClick">
                Créer
            </div>
        </div>
    </div>

</template>
<script>

import Text from '../../utils/input/Text.vue';
import Title from '../../utils/title/Title.vue';
import Select from '../../utils/input/select.vue';
import Error from '../../utils/Error.vue';

import successMessageStore from '../../navbar/SuccessMessageStore';

import proprietaireConst from './ProprietaireConst';
const { genreProprio } = proprietaireConst()

    export default {

        props: ['proprietaire', 'deleteProps'],
        data() {
            return {
                genreProprio,

                data: {
                    nom: undefined,
                    prenom: undefined,
                    date_naissance: undefined,
                    email: undefined,
                    telephone: undefined,
                    iban: undefined,
                    bic: undefined,
                    genre: undefined,
                    cp: undefined,
                    ville: undefined,
                    adresse: undefined
                },
            }
        },
        methods: {
            async updateProprietaireClick() {
                if (await this.proprietaire.updateProprietaire(this.data)) {
                    successMessageStore.addSuccessMessage('Le proprietaire a été modifié')
                }
            },
            async deleteProprietaireClick() {
                if (await this.proprietaire.deleteProprietaire()){
                    successMessageStore.addSuccessMessage('Le proprietaire a été suprimé')
                    this.$router.push({ name: 'proprio.menu'})
                }
            },
            async createProprietaireClick(){
                let idNewIdProprietaire = await this.proprietaire.createProprietaire(this.data)
                if (idNewIdProprietaire != 0){
                    successMessageStore.addSuccessMessage('Le proprietaire a été créé')
                    this.$router.push({ name: 'proprio.show', params: { proprio_id: idNewIdProprietaire } })
                } 
            },
            changeAdresse(value) {
                this.data = {...this.data, adresse: value}
            },
            changeCp(value) {
                this.data = {...this.data, cp: value}
            },
            changeVille(value) {
                this.data = { ...this.data, ville: value}
            },
            changeNom(value){
                this.data = {...this.data, nom: value}
            },
            changePrenom(value){
                this.data = {...this.data, prenom: value}
            },
            changeDateNaissance(value){
                this.data = {...this.data, date_naissance: value}
            },
            changeEmail(value){
                this.data = {...this.data, email: value}
            },
            changeTelephone(value){
                this.data = {...this.data, telephone: value}
            },
            changeIban(value){
                this.data = {...this.data, iban: value}
            },
            changeBic(value){
                this.data = {...this.data, bic: value}
            },
            changeGenre(value){
                this.data = {...this.data, genre: value}
            }
        },
        computed: {
            canDelete() {
                return this.deleteProps == "true"
            },
        },
        updated() {

        },
        components: { Title, Text, Select, Error }
    }

</script>