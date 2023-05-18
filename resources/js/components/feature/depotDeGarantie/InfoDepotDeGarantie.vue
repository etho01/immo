<template>

    <div>
        <Error :erreurTab="depotDeGarantie.erreurTab"  />
        <Title title="Information sur le depot de garantie" />
        <div class="grid grid-cols-2 mt-3">
            <Text label="Montant du depot" @changeValue="changeMontantEncaisser" :value="depotDeGarantie.getDepotDeGarantie.montant_encaisser"/>
            <Text label="Date du depot" type="date" @changeValue="chnageDateEncaissement" :value="depotDeGarantie.getDepotDeGarantie.date_encaissement"/>
        </div>
        <Title title="Information sur la resitution de la garantie" />
        <div class="grid grid-cols-2 mt-3">
            <Text label="Montant du retrait" @changeValue="changeMontantRestituer" :value="depotDeGarantie.getDepotDeGarantie.montant_restituer"/>
            <Text label="Date du retrait" type="date" @changeValue="changeDateResitution" :value="depotDeGarantie.getDepotDeGarantie.date_restitution"/>
        </div>
        <div class="mt-5 flex justify-end" v-if="!depotDeGarantie.isNewDepotDeGarantie">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="updateDepotDeGarantieClick">
                Modifier
            </div>
            <div class="bg-red-400 hover:bg-red-500 px-3 py-1 rounded-md ml-2 cursor-pointer" v-if="canDelete" @click="deleteDepotDeGarantieCLick">
                Supprimer
            </div>
        </div>
        <div v-else class="mt-5 flex justify-end">
            <div class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md cursor-pointer" @click="createDepotDeGarantieClick">
                Créer
            </div>
        </div>
    </div>

</template>
<script>
import Error from '../../utils/Error.vue';
import Text from '../../utils/input/Text.vue';
import Title from '../../utils/title/Title.vue';
import successMessageStore from '../../navbar/SuccessMessageStore';

    export default {
        props : ['depotDeGarantie', 'deleteProps', 'contrat_id'],
        data() {
            return {
                data: {
                    montant_encaisser: undefined,
                    date_encaissement: undefined,
                    montant_restituer: undefined,
                    date_restitution: undefined,
                    contrat_id: this.contrat_id
                }
            }
        },
        methods: {
            changeMontantEncaisser(data) {
                this.data = {...this.data, montant_encaisser: data}
            },
            chnageDateEncaissement(value) {
                this.data = {...this.data, date_encaissement: value}
            },
            changeMontantRestituer(value) {
                this.data = {...this.data, montant_restituer: value}
            },
            changeDateResitution(value) {
                this.data = {...this.data, date_restitution: value}
            },
            async updateDepotDeGarantieClick() {
                console.log(this.depotDeGarantie)
                if (await this.depotDeGarantie.updateDepotDeGarantie(this.data)) {
                    successMessageStore.addSuccessMessage('Le depôt de garantie a été modifié')
                    this.$emit('refresh');
                }
            },
            async deleteDepotDeGarantieCLick() {
                if (await this.depotDeGarantie.deleteDepotDeGarantie()) {
                    successMessageStore.addSuccessMessage('Le depôt de garantie a été suprimé')
                    this.$emit('refresh')
                }
            },
            async createDepotDeGarantieClick() {
                if (await this.depotDeGarantie.createDepotDeGarantie(this.data)) {
                    successMessageStore.addSuccessMessage('Le depôt de garantie a été créé')
                    this.$emit('refresh')
                }
            }
        },
        components: { Error, Title, Text }
    }

</script>