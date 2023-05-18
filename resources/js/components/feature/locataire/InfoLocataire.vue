<template>

    <div>
        <Error :erreurTab="locataire.erreurTab" />
        <Title title="Informations locataire" />
        <div class="grid grid-cols-3 mt-3">
            <Text label="Prénom du locataire" :value="locataire.getLocataire.prenom" @changeValue="changePrenom" placeholder="Prénom du locataire" />
            <Text label="Nom du locataire " :value="locataire.getLocataire.nom" @changeValue="changeNom" placeholder="Nom du locataire"/>
            <Text label="Date de naissance" :value="locataire.getLocataire.date_naissance" @changeValue="changeDateNaissance" type="date" />
            <Text label="Email" :value="locataire.getLocataire.email" @changeValue="changeEmail" placeholder="Email du locataire" />
            <Text label="Télèphone" :value="locataire.getLocataire.telephone" @changeValue="changeTelephone" placeholder="Télèphone" />
            <Select :param="genreLoc" label="Genre du locataire" @changeValue="changeGenre" :valueDefault="locataire.getLocataire.genre" />
        </div>
        <Title title="Informations bancaires locataire" />
        <div class="grid grid-cols-2 mt-3">
            <Text label="Iban" placeholder="Iban" @changeValue="changeIban" :value="locataire.getLocataire.iban" />
            <Text label="Bic" placeholder="Bic" @changeValue="changeBic" :value="locataire.getLocataire.bic" />
        </div>
        <div class="mt-5 flex justify-end" v-if="!locataire.isNewLocataire">
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
import Text from '../../utils/input/Text.vue';
import Title from '../../utils/title/Title.vue';
import LocataireConst from './LocataireConst.js';
import Select from '../../utils/input/select.vue';

import useLocataire from './locataireServices';
import Error from '../../utils/Error.vue';
import successMessageStore from '../../navbar/SuccessMessageStore';

const { getLocataire, locataire, updateLocataire, deleteLocataire, createLocataire, erreurTab } = useLocataire()

const { genreLoc } = LocataireConst();

    export default {
        props: ['locataire', 'deleteProps'],
        data() {
            return {
                genreLoc,

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
            }
        },
        methods: {
            async updateLocataireClick() {
                if ( await this.locataire.updateLocataire(this.data)) {
                    successMessageStore.addSuccessMessage('Le locataire a etait modifié')
                }
            },
            async deleteLocataireClick() {
                if (await this.locataire.deleteLocataire()){
                    successMessageStore.addSuccessMessage('Le locataire a etait supprimé')
                    this.$router.push({ name: 'locataire.menu'})
                }
            },
            async createLocataireClick(){
                let idNewIdLocataire = await this.locataire.createLocataire(this.data)
                if (idNewIdLocataire != 0){
                    successMessageStore.addSuccessMessage('Le locataire a etait créé')
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
            canDelete() {
                return this.deleteProps == "true"
            },
        },
        updated() {

        },
        components: { Title, Text, Select, Error }
}

</script>