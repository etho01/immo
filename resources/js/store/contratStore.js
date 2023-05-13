import { defineStore } from "pinia";

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
    setContrats
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
            haveContratLoad: false
        }
    },
    getters: {
        getContrat: (state) => state.contrat,
        getContrats: (state) => state.contrats,
        isNewContrat: (state) => {
            return state.newContrat}
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
                this.haveContratLoad = true
                return true
            }
            return false
        },

        // liste des fonction pour la liste des contrats
        async getContratsByFiltre(filtre) {
            if (await getContrats(filtre)) {
                this.contrats = contrats.value
                this.page = page.value
                this.nbPage = nbPage.value
                return true
            }
            return false
        },
        async gotoPage(nbPage) {
            if (await gotoPage(nbPage)) {
                this.contrats = contrats.value
                this.page = page.value
                this.nbPage = nbPage.value
            }
        },
        setNewContrat() {
            this.newContrat = true
        }
    }
})