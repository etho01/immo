<template>
    <div>
        <Error :erreurTab="contrat.erreurTab" />
        <Title title="Information contrat" />
        <div class="my-5 text-center" v-if="!contrat.isNewContrat">
            Solde du contrat: {{ contrat.getContrat.solde }} euros
        </div>
        <div class="grid grid-cols-2 mt-3">
            <Text type="date" label="Date de début" :value="contrat.getContrat.date_debut" @changeValue="changeDateDebut"/>
            <Text label="Ref du contrat" :value="contrat.getContrat.ref" @changeValue="changeRef" />
            <Text type="date" label="Date de fin" :value="contrat.getContrat.date_fin" @changeValue="chnageDateFin"/>
        </div>
        <div v-if="contrat.isNewContrat" class="grid grid-cols-2 mt-3">
            <SelectAppart @changeValue="changeAppart">

            </SelectAppart>
            <SelectLocataire @changeValue="chnageLocataire"></SelectLocataire>
        </div>
        <div class="mt-5 flex justify-end" v-if="!contrat.isNewContrat">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="createQuittance">
                Créer une quittance
            </div>
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md ml-2 cursor-pointer" @click="updateContratClick">
                Modifier
            </div>
            <div class="bg-red-400 hover:bg-red-500 px-3 py-1 rounded-md ml-2 cursor-pointer" v-if="canDelete" @click="deleteContratClick">
                Supprimer
            </div>
            <Modal ref="modalQuittance" title="Créer une quittance" >
                <CreateQuitance :contrat_id="contrat.getContrat.id" />
            </Modal>
        </div>
        <div v-else class="mt-5 flex justify-end">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="createContratClick">
                Créer
            </div>
        </div>
    </div>

</template>
<script>

    import Text from '../../utils/input/Text.vue';
    import Title from '../../utils/title/Title.vue';
    import SelectAppart from '../appart/SelectAppart.vue';
    import SelectLocataire from '../locataire/SelectLocataire.vue';
    import Error from '../../utils/Error.vue';
    import successMessageStore from '../../navbar/SuccessMessageStore';
    import Modal from '../../utils/component/modal/Modal.vue';
    import CreateQuitance from '../quittance/CreateQuitance.vue';

    export default {
        props: ['contrat', 'deleteProps'],
        data() {
            return {

                date_debut: this.contrat.getContrat.date_debut,
                date_fin: this.contrat.getContrat.date_fin,
                appart_id: undefined,
                locataire_id: undefined,
                ref: undefined
            }
        },
        methods : {
            async updateContratClick() {
                if (await this.contrat.updateContrat(this.getData)) {
                    successMessageStore.addSuccessMessage('Le contrat a été modifié')
                }
            },
            async deleteContratClick(){
                if (await this.contrat.deleteContrat()){
                    successMessageStore.addSuccessMessage('Le contrat a été supprimé')
                    this.$router.push({ name: 'contrat.menu'})
                }
            },
            async createContratClick(){
                let idNewIdContrat = await this.contrat.createContrat(this.getData);
                if (idNewIdContrat != 0){
                    successMessageStore.addSuccessMessage('Le contrat a été créé')
                    this.$router.push({ name: 'contrat.show', params: { contrat_id: idNewIdContrat } })
                }
            },
            createQuittance (){
                this.$refs.modalQuittance.toogle();
            },
            changeDateDebut(newDateDebut){
                this.date_debut = newDateDebut;
            },
            chnageDateFin(newDateFin){
                this.date_fin = newDateFin;
            },
            changeAppart(id){
                this.appart_id = id
            },
            chnageLocataire(id){
                this.locataire_id = id
            },
            changeRef(newRef) {
                this.ref = newRef
            }
        },
        computed: {
            canDelete() {
                return this.deleteProps == "true"
            },
            getData() {
                return {
                    date_debut: this.date_debut == undefined ? this.contrat.getContrat.date_debut : this.date_debut,
                    date_fin: this.date_fin  == undefined ? this.contrat.getContrat.date_fin : this.date_fin,
                    ref: this.ref,
                    appart_id: this.appart_id,
                    locataire_id: this.locataire_id
                }
            }
        },
        updated() {
        },
        components: { Title, Text, SelectAppart, SelectLocataire, Error, Modal, CreateQuitance }

    }

</script>