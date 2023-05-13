import { defineStore } from "pinia";
import { useAppartStore } from './appartStore';
import { useLocataireStore } from './locataireStore'
import { usePaiementStore } from './paiementStore'

import userContrat from '../services/contratServices.js';

const {
    contrat,
    contrats,
    getContrat,
    getContrats,
    updateContrat,
    deleteContrat,
    createContrat,
    page,
    gotoPage,
    nbPage,
    erreurTab,
    setContrat,
    setContrats,
    refreshErreur
} = userContrat()

export const useContratStore = defineStore('contrat', {
    state: () => {
        return {
            contrats: [],
            contrat: {},
            page: 1,
            nbPage: 1,
            erreurTab,
            newContrat : false,
            haveContratLoad: false,
            locataire: useLocataireStore(),
            appart: useAppartStore(),
            paiement: usePaiementStore()
        }
    },
    getters: {
        getContrat: (state) => state.contrat,
        getContrats: (state) => state.contrats,
        isNewContrat: (state) => state.newContrat
    },
    actions: {
        async updateContrat(data) {
            if (this.haveContratLoad) {
                if ( await updateContrat(this.getContrat.id, data)) {
                    this.contrat = {...this.getContrat, ...data}
                    return true
                }
            }
            return false
        },
        async deleteContrat() {
            if (this.haveContratLoad) {
                if (await deleteContrat(this.getContrat.id)) {
                    this.haveContratLoad = false
                    this.contrat = {}
                    return true
                }
            }
            return false
        },
        async createContrat(data) {
            let idNewContrat = await createContrat(data)
            if (idNewContrat != 0) {
                await this.getContratById(idNewContrat)
                this.newContrat = false
                return idNewContrat
            }
            return idNewContrat
        },


        async getContratById(id) {
            if (await getContrat(id)){
                this.contrat = contrat
                this.changeValueSetContrat()
                return true
            }
            return false
        },

        changeValueSetContrat() {
            this.haveContratLoad = true
            this.newContrat = false
            this.locataire.getLocataireByObject(this.getContrat.locataire)
            this.appart.getAppartByObj(this.getContrat.appart)
            this.paiement.getPaiementsByObj(this.getContrat.paiement)
            refreshErreur()
        },

        async getContratsByFiltre(filtre) {
            if (await getContrats(filtre)) {
                this.contrats = contrats.value
                this.page = page.value
                this.nbPage = nbPage.value
                return true
            }
            return false
        },

        async gotoPage(nbPageGo) {
            if (await gotoPage(nbPageGo)) {
                this.contrats = contrats.value
                this.page = page.value
                this.nbPage = nbPage.value
            }
        },
        setNewContrat() {
            this.newContrat = true
            this.contrat = {}
        }
    }
})