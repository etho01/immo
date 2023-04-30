<template>

<div>
        <Error :erreurTab="erreurTab" />
        <Title title="Informations Proprietaire" />
        <div class="grid grid-cols-3 mt-3">
            <Text label="Prénom du Proprietaire" :value="getProprietaireUse.prenom" @changeValue="changePrenom" placeholder="Prénom du Proprietaire" />
            <Text label="Nom du Proprietaire " :value="getProprietaireUse.nom" @changeValue="changeNom" placeholder="Nom du Proprietaire"/>
            <Text label="Date de naissance" :value="getProprietaireUse.date_naissance" @changeValue="changeDateNaissance" type="date" />
            <Text label="Email" :value="getProprietaireUse.email" @changeValue="changeEmail" placeholder="Email du Proprietaire" />
            <Text label="Télèphone" :value="getProprietaireUse.telephone" @changeValue="changeTelephone" placeholder="Télèphone" />
            <Select :param="genreProprio" label="Genre du Proprietaire" @changeValue="changeGenre" :valueDefault="getProprietaireUse.genre" />
        </div>
        <Title title="Informations bancaires Proprietaire" />
        <div class="grid grid-cols-2 mt-3">
            <Text label="Iban" placeholder="Iban" @changeValue="changeIban" :value="getProprietaireUse.iban" />
            <Text label="Bic" placeholder="Bic" @changeValue="changeBic" :value="getProprietaireUse.bic" />
        </div>
        <div class="mt-5 flex justify-end" v-if="proprietaire_id != 'new'">
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

import Text from '../utils/input/Text.vue';
import Title from '../utils/title/Title.vue';
import Select from '../utils/input/select.vue';

import Error from '../utils/Error.vue';

import useProprietaire from '../../services/proprietaireServices.js'
import proprietaireConst from '../../const/ProprietaireConst';

const { getProprietaire, proprietaire, updateProprietaire, deleteProprietaire, createProprietaire, erreurTab } = useProprietaire();
const { genreProprio } = proprietaireConst()

    export default {

        props: ['proprietaire_id', 'deleteProps', 'proprietaireBase'],
        data() {
            return {
                genreProprio,
                proprietaire,

                data: {
                    nom: undefined,
                    prenom: undefined,
                    date_naissance: undefined,
                    email: undefined,
                    telephone: undefined,
                    iban: undefined,
                    bic: undefined,
                    genre: undefined
                },
                erreurTab
            }
        },
        methods: {
            getProprietaire,
            updateProprietaire,
            deleteProprietaire,
            createProprietaire,
            updateProprietaireClick() {
                this.updateProprietaire(this.getProprietaireUse.id, this.data)
            },
            async deleteProprietaireClick() {
                if (await this.deleteProprietaire(this.getProprietaireUse.id)){
                    this.$router.push({ name: 'proprio.menu'})
                }
            },
            async createProprietaireClick(){
                let idNewIdProprietaire = await this.createProprietaire(this.data)
                console.log(idNewIdProprietaire);
                if (idNewIdProprietaire != 0){
                    console.log(idNewIdProprietaire);
                    this.$router.push({ name: 'proprio.show', params: { proprio_id: idNewIdProprietaire } })
                } 
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
            getProprietaireUse() {
                if (this.proprietaireBase == undefined){
                    return this.proprietaire
                }
                return this.proprietaireBase;
            },
            canDelete() {
                return this.deleteProps == "true"
            },
        },
        mounted(){
            if (this.proprietaire_id != 'new' && this.proprietaireBase == undefined){
                this.getProprietaire(this.proprietaire_id)
            }
        },


        components: { Title, Text, Select, Error }
    }

</script>