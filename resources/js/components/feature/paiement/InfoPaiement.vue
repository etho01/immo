<template>

    <div>
        <Error :erreurTab="paiement.erreurTab" />
        <Title title="Informations sur le paiement" />
        <div class="grid grid-cols-2 mt-3">
            <Text label="Date paiement" type="date" :value="paiement.getPaiement.date_paiement" @changeValue="changeDatePaiment" />
            <Text label="Montant du paiement" :value="paiement.getPaiement.montant_paiement" @changeValue="changeMontantPaiment" />
            <Select :valueDefault="paiement.getPaiement.origine" @changeValue="changeOrigine" :param="originePaiement" label="Origine du paiement" />
            <Select :valueDefault="paiement.getPaiement.methode" @changeValue="changeMethode" :param="methodePaiement" label="methode du paiement" />
        </div>
        <div class="mt-5 flex justify-end" v-if="!paiement.isNewPaiement">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="updatePaiementClick">
                Modifier
            </div>
            <div class="bg-red-400 hover:bg-red-500 px-3 py-1 rounded-md ml-2 cursor-pointer" v-if="canDelete" @click="deletePaiementCLick">
                Supprimer
            </div>
        </div>
        <div v-else class="mt-5 flex justify-end">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="createPaiementClick">
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

import paiementConst from './PaiementConst.js';
import successMessageStore from '../../navbar/SuccessMessageStore';

const { originePaiement, methodePaiement } = paiementConst();

    export default {
        props: ['paiement', 'deleteProps', 'contrat_id'],
        data() {
            return {
                originePaiement,
                methodePaiement,
                data: {
                    date_paiement: undefined,
                    montant_paiement: undefined,
                    origine: undefined,
                    contrat_id: this.contrat_id,
                    methode: undefined
                },
            }
        },
        methods: {
            changeDatePaiment(value){
                this.data = {...this.data, date_paiement: value}
            },
            changeMontantPaiment(value){
                this.data = {...this.data, montant_paiement: value}
            },
            changeOrigine(value) {
                this.data= {...this.data, origine: value}
            },
            changeMethode(value) {
                this.data = {... this.data, methode: value}
            },
            async deletePaiementCLick() {
                if (await this.paiement.deletePaiement()) {
                    successMessageStore.addSuccessMessage('Le paiement a été suprimé')
                }
                this.$emit('refresh');
            },
            async updatePaiementClick() {
                if (await this.paiement.updatePaiement(this.data)) {
                    successMessageStore.addSuccessMessage('Le paiement a été modifié')
                    this.$emit('refresh');
                }
            },
            async createPaiementClick() {
                if (await this.paiement.createPaiement(this.data) != 0){
                    successMessageStore.addSuccessMessage('Le paiement a été créé')
                    this.$emit('refresh');
                }
            }
        },
        computed: {
            canDelete() {
                return this.deleteProps == "true"
            },
        },
        watch: {
            contrat_id() {
                this.data.contrat_id = this.contrat_id
            }
        },
        components: { Title, Text, Error, Select }

    }

</script>