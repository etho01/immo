import { defineStore } from "pinia";

import userAgence from './agenceServices.js';

import { deleteUndefine } from "../../../store/fonc.js";

const {
    agence,
    agences,
    getAgence,
    getAgences,
    updateAgence,
    deleteAgence,
    createAgence,
    page,
    gotoPage,
    nbPage,
    erreurTab,
    setAgence,
    setAgences,
    refreshErreur
} = userAgence()

export const useAgenceStore = defineStore('agence', {
    state: () => {
        return {
            agences: [],
            agence: {},
            page: 1,
            nbPage: 1,
            erreurTab,
            newAgence : false,
            haveAgenceLoad: false
        }
    },
    getters: {
        getAgence: (state) => state.agence,
        getAgences: (state) => state.agences,
        isNewAgence: (state) => state.newAgence
    },
    actions: {
        async updateAgence(data) {
            if (this.haveAgenceLoad) {
                if ( await updateAgence(this.getAgence.id, data)) {
                    this.agence = {...this.getAgence, ...deleteUndefine(data)}
                    return true
                }
            }
            return false
        },
        async deleteAgence() {
            if (this.haveAgenceLoad) {
                if (await deleteAgence(this.getAgence.id)) {
                    this.haveAgenceLoad = false
                    this.agence = {}
                    return true
                }
            }
            return false
        },
        async createAgence(data) {
            let idNewAgence = await createAgence(data)
            if (idNewAgence != 0) {
                await this.getAgenceById(idNewAgence)
                this.newAgence = false
                return idNewAgence
            }
            return idNewAgence
        },


        async getAgenceById(id) {
            if (await getAgence(id)){
                this.agence = {...agence.value}
                this.changeValueSetAgence()
                return true
            }
            return false
        },

        changeValueSetAgence() {
            this.haveAgenceLoad = true
            this.newAgence = false
            refreshErreur()
        },

        async getAgencesByFiltre(filtre) {
            if (await getAgences(filtre)) {
                this.agences = agences.value
                this.page = page.value
                this.nbPage = nbPage.value
                return true
            }
            return false
        },
        async gotoPage(nbPageGo) {
            if (await gotoPage(nbPageGo)) {
                this.agences = agences.value
                this.page = page.value
                this.nbPage = nbPage.value
            }
        },
        setNewAgence() {
            this.newAgence = true
            this.agence = {}
        }
    }
})