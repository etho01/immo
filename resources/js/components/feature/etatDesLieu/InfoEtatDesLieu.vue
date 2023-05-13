<template>

    <div>
        <Error :erreurTab="etatDesLieu.erreurTab" />
        <Title title="Informations sur l'état des lieux" />
        <div class="grid grid-cols-2 mt-3">
            <Text label="Date de l'état des lieux" @changeValue="changeDate" :value="etatDesLieu.getEtatDesLieu.date" type="date" />
            <Select :param="stadeEtatDesLieu" label="Stade de l'état des lieux" @changeValue="changeStade" :valueDefault="etatDesLieu.getEtatDesLieu.stade" />
        </div>
        <div class="mt-3">
            <Text label="Commentaire" :value="etatDesLieu.getEtatDesLieu.commentaire" @changeValue="changeCommentaire" />
        </div>
        <div class="mt-5 flex justify-end" v-if="!etatDesLieu.isNewEtatDesLieu">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="updateEtatDesLieuClick">
                Modifier
            </div>
            <div class="bg-red-400 hover:bg-red-500 px-3 py-1 rounded-md ml-2 cursor-pointer" v-if="canDelete" @click="deleteEtatDesLieuClick">
                Supprimer
            </div>
        </div>
        <div v-else class="mt-5 flex justify-end">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="createEtatDesLieuClick">
                Créer
            </div>
        </div>

    </div>

</template>
<script>
import Text from '../../utils/input/Text.vue';
import Title from '../../utils/title/Title.vue';
import Error from '../../utils/Error.vue';

import Select from '../../utils/input/select.vue';
import etatDesLieuConst from "./EtatDesLieuConst.js";

const { stadeEtatDesLieu } = etatDesLieuConst();


    export default {
        props: ['etatDesLieu', 'deleteProps', "contrat_id", 'appart_id'],
        data() {
            return {
                stadeEtatDesLieu,
                data: {
                    date: undefined,
                    stade: undefined,
                    commentaire : undefined,
                    contrat_id: this.contrat_id,
                    appart_id: this.appart_id
                },
            }
        },
        methods: {
            changeDate(value){
                this.data = {...this.data, date: value}
            },
            changeStade(value){
                this.data = {...this.data, stade: value}
            },
            changeCommentaire(value){
                this.data = {...this.data, commentaire: value}
            },
            async createEtatDesLieuClick () {
                if (await this.etatDesLieu.createEtatDesLieu(this.data) != 0){
                    this.$emit('refresh');
                }
            },
            async updateEtatDesLieuClick (){
                await this.etatDesLieu.updateEtatDesLieu(this.data);
                this.$emit('refresh');
            },
            async deleteEtatDesLieuClick (){
                await this.etatDesLieu.deleteEtatDesLieu();
                this.$emit('refresh');
            }
        },
        computed: {
            canDelete() {
                return this.deleteProps == "true"
            },
        },
        watch: {
            appart_id() {
                this.data = {...this.data, appart_id: this.appart_id}
            },
            contrat_id() {
                this.data = {...this.data, contrat_id: this.contrat_id}
            },
        },
        components: { Title, Text, Error, Select }
    }

</script>