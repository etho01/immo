import { defineStore } from "pinia";

import userPaiement from '../services/paimentServices.js';

const {
    paiement,
    paiements,
    getPaiement,
    getPaiements,
    updatePaiement,
    deletePaiement,
    createPaiement,
    page,
    gotoPage,
    nbPage,
    erreurTab,
    setPaiement,
    setPaiements,
    refreshErreur
} = userPaiement()

export const usePaiementStore = defineStore('paiement', {
    state: () => {
        return {
            paiements: [],
            paiement: {},
            page: 1,
            nbPage: 1,
            erreurTab,
            newPaiement : false,
            havePaiementLoad: false,
        }
    },
    getters: {
        getPaiement: (state) => state.paiement,
        getPaiements: (state) => state.paiements,
        isNewPaiement: (state) => state.newPaiement
    },
    actions: {
        async updatePaiement(data) {
            if (this.havePaiementLoad) {
                if ( await updatePaiement(this.getPaiement.id, data)) {
                    this.paiement = {...this.getPaiement, ...data}
                    return true
                }
            }
            return false
        },
        async deletePaiement() {
            if (this.havePaiementLoad) {
                if (await deletePaiement(this.getPaiement.id)) {
                    this.havePaiementLoad = false
                    this.paiement = {}
                    return true
                }
            }
            return false
        },
        async createPaiement(data) {
            let idNewPaiement = await createPaiement(data)
            if (idNewPaiement != 0) {
                await this.getPaiementById(idNewPaiement)
                this.newPaiement = false
                return idNewPaiement
            }
            return idNewPaiement
        },


        async getPaiementById(id) {
            if (await getPaiement(id)){
                this.paiement = paiement
                this.changeValueSetPaiement()
                return true
            }
            return false
        },

        getPaiementByObj(paiementObj) {
            this.paiement = paiementObj
            this.changeValueSetPaiement();
        },

        changeValueSetPaiement() {
            this.havePaiementLoad = true
            this.newPaiement = false
            refreshErreur()
        },

        getPaiementsByObj(paiementsObj) {
            this.paiements = paiementsObj
            this.changeValueSetPaiements()
        },

        async getPaiementsByFiltre(filtre) {
            if (await getPaiements(filtre)) {
                this.paiements = paiements.value
                this.changeValueSetPaiements()
                return true
            }
            return false
        },

        changeValueSetPaiements() {
            this.page = page.value
            this.nbPage = nbPage.value
        },

        async gotoPage(nbPageGo) {
            if (await gotoPage(nbPageGo)) {
                this.paiements = paiements.value
                this.page = page.value
                this.nbPage = nbPage.value
            }
        },
        setNewPaiement() {
            this.newPaiement = true
            this.paiement = {}
        }
    }
})