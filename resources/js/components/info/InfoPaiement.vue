<template>

    <div>
        <Error :erreurTab="erreurTab" />
        <Title title="Informations sur le paiement" />
        <div class="grid grid-cols-3 mt-3">
            <Text label="Date paiement" type="date" :value="getPaiementUse.date_paiement" @changeValue="changeDatePaiment" />
            <Text label="Montant du paiement" :value="getPaiementUse.montant_paiement" @changeValue="changeMontantPaiment" />
            <Select :valueDefault="getPaiementUse.origine" @changeValue="changeOrigine" :param="originePaiement" label="Origine du paiement" />
        </div>
        <div class="mt-5 flex justify-end" v-if="paiement_id != 'new'">
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
import Text from '../utils/input/Text.vue';
import Title from '../utils/title/Title.vue';
import usePaiement from '../../services/paimentServices';
import Error from '../utils/Error.vue';
import Select from '../utils/input/select.vue';

import paiementConst from '../../const/PaiementConst.js';

const { originePaiement } = paiementConst();

const { paiement, getPaiement, deletePaiement, updatePaiement, createPaiement,erreurTab ,refreshErreur } = usePaiement();

    export default {
        props: ['paiement_id', 'deleteProps', "paiementBase", "contrat_id"],
        data() {
            return {
                paiement,

                data: {
                    date_paiement: undefined,
                    montant_paiement: undefined,
                    origine: undefined,
                    contrat_id: this.contrat_id
                },
                erreurTab,
                originePaiement
            }
        },
        methods: {
            getPaiement,
            deletePaiement,
            updatePaiement,
            createPaiement,
            refreshErreur,
            changeDatePaiment(value){
                this.data = {...this.data, date_paiement: value}
            },
            changeMontantPaiment(value){
                this.data = {...this.data, montant_paiement: value}
            },
            changeOrigine(value) {
                this.data= {...this.data, origine: value}
            },
            async deletePaiementCLick() {
                await this.deletePaiement(this.getPaiementUse.id);
                this.$emit('refresh');
            },
            async updatePaiementClick() {
                await this.updatePaiement(this.getPaiementUse.id, this.data)
                this.$emit('refresh');
            },
            async createPaiementClick() {
                if (await this.createPaiement(this.data) != 0){
                    this.$emit('refresh');
                }
            }
        },
        computed: {
            getPaiementUse() {
                if (this.paiementBase == undefined) {
                    if (this.paiement == undefined) {
                        return []
                    }
                    return this.paiement
                }
                return this.paiementBase;
            },
            canDelete() {
                return this.deleteProps == "true"
            },
        },
        watch: {
            contrat_id() {
                this.data = {...this.data, contrat_id: this.contrat_id}
            },
            paiementBase() {
                this.refreshErreur();
            },
            paiement_id() {
                this.refreshErreur();
            }
        },
        components: { Title, Text, Error, Select }

    }

</script>