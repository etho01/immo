<template>

    <div>

        <Title title="Information etat des lieu" />
        <div class="grid grid-cols-2 mt-3">
            <Text label="Date de l'etat des lieu" @changeValue="changeDate" :value="getEtatDesLieuUse.date" type="date" />
            <Text label="Stade de l'etat des lieu" :value="getEtatDesLieuUse.stade" @changeValue="changeStade" />
        </div>
        <div class="mt-3">
            <Text label="commentaire" :value="getEtatDesLieuUse.commentaire" @changeValue="changeCommentaire" />
        </div>
        <div class="mt-5 flex justify-end" v-if="etartdeslieu_id != 'new'">
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
import Text from '../utils/input/Text.vue';
import Title from '../utils/title/Title.vue';
import useEtatDesLieu from '../../services/etatDesLieuServices';

const { etatDesLieu, getEtatDesLieu, createEtatDesLieu, deleteEtatDesLieu, updateEtatDesLieu } = useEtatDesLieu();

    export default {
        props: ['etartdeslieu_id', 'deleteProps', "EtatDesLieuBase", "contrat_id", 'appart_id'],
        data() {
            return {
                etatDesLieu,
                data: {
                    date: undefined,
                    stade: undefined,
                    commentaire : undefined,
                    contrat_id: this.contrat_id,
                    appart_id: this.appart_id
                }
            }
        },
        methods: {
            getEtatDesLieu,
            createEtatDesLieu,
            deleteEtatDesLieu,
            updateEtatDesLieu,
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
                await this.createEtatDesLieu(this.data)
                this.$emit('refresh');
            },
            async updateEtatDesLieuClick (){
                await this.updateEtatDesLieu(this.getEtatDesLieuUse.id, this.data);
                this.$emit('refresh');
            },
            async deleteEtatDesLieuClick (){
                this.deleteEtatDesLieu(this.getEtatDesLieuUse.id);
                this.$emit('refresh');
            }
        },
        computed: {
            getEtatDesLieuUse() {
                if (this.EtatDesLieuBase == undefined) {
                    if (this.etatDesLieu == undefined) {
                        return []
                    }
                    return this.etatDesLieu
                }
                return this.EtatDesLieuBase;
            },
            canDelete() {
                return this.deleteProps == "true"
            },
        },
        mounted () {
            if (this.appart_id != 'new' && this.EtatDesLieuBase != undefined){
                this.getEtatDesLieu(this.appart_id);
            }
        },
        watch: {
            appart_id() {
                this.data = {...this.data, appart_id: this.appart_id}
            },
            contrat_id() {
                this.data = {...this.data, contrat_id: this.contrat_id}
            }
        },
        components: { Title, Text }
    }

</script>