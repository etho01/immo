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
            contrat: 'test',
            page: 1,
            nbPage: 1,
            erreurTab
        }
    },
    getters: {
        getContrat: (state) => state.contrat,
        getContrats: (state) => state.contrats
    },
    actions: {
        async getContratById(id) {
            if (await getContrat(id)){
                this.contrat = contrat
            }
        },
        async getContratsByFiltre(filtre) {
            if (await getContrats(filtre)) {
                this.contrats = contrats.value
                this.page = page.value
                this.nbPage = nbPage.value
            }
        },
        async gotoPage(nbPage) {
            if (await gotoPage(nbPage)) {
                this.contrats = contrats.value
                this.page = page.value
                this.nbPage = nbPage.value
            }
        }
    }
})