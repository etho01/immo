<template>

    <div>
        <Title title="Informations locataire" />
        <div class="grid grid-cols-3 mt-3">
            <Text label="Prenom du locataire" :value="getLocataireUse.prenom" @changeValue="changePrenom" placeholder="Prenom du locataire" />
            <Text label="Nom du locataire " :value="getLocataireUse.nom" @changeValue="changeNom" placeholder="Nom du locataire"/>
            <Text label="Date de naissance" :value="getLocataireUse.date_naissance" @changeValue="changeDateNaissance" type="date" />
            <Text label="Email" :value="getLocataireUse.email" @changeValue="changeEmail" placeholder="Email du locataire" />
            <Text label="Telephone" :value="getLocataireUse.telephone" @changeValue="changeTelephone" placeholder="Telephone" />
            <Select :param="genreLoc" label="Genre du locataire" @changeValue="changeGenre" :value="getLocataireUse.genre" />
        </div>
        <Title title="Informations bancaires locataire" />
        <div class="grid grid-cols-2 mt-3">
            <Text label="Iban" placeholder="Iban" @changeValue="changeIban" :value="getLocataireUse.iban" />
            <Text label="Bic" placeholder="Bic" @changeValue="changeBic" :value="getLocataireUse.bic" />
        </div>
        <div class="mt-5 flex justify-end" v-if="locataire_id != 'new'">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="updateLocataireClick">
                Modifier
            </div>
            <div class="bg-red-400 hover:bg-red-500 px-3 py-1 rounded-md ml-2 cursor-pointer" v-if="canDelete" @click="deleteLocataireClick">
                Supprimer
            </div>
        </div>
        <div v-else class="mt-5 flex justify-end">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="createLocataireClick">
                Créer
            </div>
        </div>
    </div>

</template>
<script>
import Text from '../utils/input/Text.vue';
import Title from '../utils/title/Title.vue';
import LocataireConst from '../../const/LocataireConst.js';
import Select from '../utils/input/select.vue';

import useLocataire from '../../services/locataireServices';

const { getLocataire, locataire, updateLocataire, deleteLocataire, createLocataire } = useLocataire()

const { genreLoc } = LocataireConst();

    export default {
        props: ['locataire_id', 'deleteProps', 'locataireBase'],
        data() {
            return {
                genreLoc,
                locataire,

                data: {
                    nom: undefined,
                    prenom: undefined,
                    date_naissance: undefined,
                    email: undefined,
                    telephone: undefined,
                    iban: undefined,
                    bic: undefined,
                    genre: undefined
                }
            }
        },
        methods: {
            getLocataire,
            updateLocataire,
            deleteLocataire,
            createLocataire,
            updateLocataireClick() {
                this.updateLocataire(this.getLocataireUse.id, this.data)
            },
            async deleteLocataireClick() {
                if (await this.deleteLocataire(this.getLocataireUse.id)){
                    this.$router.push({ name: 'locataire.menu'})
                }
            },
            async createLocataireClick(){
                let idNewIdLocataire = await this.createLocataire(this.data)
                if (idNewIdLocataire != 0){
                    this.$router.push({ name: 'locataire.show', params: { locataire_id: idNewIdLocataire } })
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
            getLocataireUse() {
                if (this.locataireBase == undefined){
                    return this.locataire
                }
                return this.locataireBase;
            },
            canDelete() {
                return this.deleteProps == "true"
            },
        },
        mounted(){
            if (this.locataire_id != 'new'){
                this.getLocataire(this.locataire_id)
            }
        },
        components: { Title, Text, Select }
}

</script>