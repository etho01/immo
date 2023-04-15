<template>

    <div>

        <Title title="Information sur le payment" />
        <div class="grid grid-cols-3 mt-3">
            <Text label="Date paiment" type="date" :value="getPaiementUse.date_paiement" @changeValue="changeDatePaiment" />
            <Text label="Montant paiment" :value="getPaiementUse.montant_paiement" @changeValue="changeMontantPaiment" />
            <Text label="Origine paiment" :value="getPaiementUse.origine" @changeValue="changeOrigine" />
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

const { paiement, getPaiement, deletePaiement, updatePaiement, createPaiement } = usePaiement();

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
                }
            }
        },
        methods: {
            getPaiement,
            deletePaiement,
            updatePaiement,
            createPaiement,
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
                await this.createPaiement(this.data);
                this.$emit('refresh');
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
            }
        },
        components: {Title, Text}

    }

</script>