import { defineStore } from "pinia";

import userProprietaire from '../services/proprietaireServices.js';

const {
    proprietaire,
    proprietaires,
    getProprietaire,
    getProprietaires,
    updateProprietaire,
    deleteProprietaire,
    createProprietaire,
    page,
    gotoPage,
    nbPage,
    erreurTab,
    setProprietaire,
    setProprietaires,
    refreshErreur
} = userProprietaire()

export const useProprietaireStore = defineStore('proprietaire', {
    state: () => {
        return {
            proprietaires: [],
            proprietaire: {},
            page: 1,
            nbPage: 1,
            erreurTab,
            newProprietaire : false,
            haveProprietaireLoad: false
        }
    },
    getters: {
        getProprietaire: (state) => state.proprietaire,
        getProprietaires: (state) => state.proprietaires,
        isNewProprietaire: (state) => state.newProprietaire
    },
    actions: {
        async updateProprietaire(data) {
            if (this.haveProprietaireLoad) {
                if ( await updateProprietaire(this.getProprietaire.id, data)) {
                    this.proprietaire = {...this.getProprietaire, ...data}
                    return true
                }
            }
            return false
        },
        async deleteProprietaire() {
            if (this.haveProprietaireLoad) {
                if (await deleteProprietaire(this.getProprietaire.id)) {
                    this.haveProprietaireLoad = false
                    this.proprietaire = {}
                    return true
                }
            }
            return false
        },
        async createProprietaire(data) {
            let idNewProprietaire = await createProprietaire(data)
            if (idNewProprietaire != 0) {
                await this.getProprietaireById(idNewProprietaire)
                this.newProprietaire = false
                return idNewProprietaire
            }
            return idNewProprietaire
        },


        async getProprietaireById(id) {
            if (await getProprietaire(id)){
                this.proprietaire = proprietaire
                this.haveProprietaireLoad = true
                this.newProprietaire = false
                refreshErreur()
                return true
            }
            return false
        },

        async getProprietairesByFiltre(filtre) {
            if (await getProprietaires(filtre)) {
                this.proprietaires = proprietaires.value
                this.page = page.value
                this.nbPage = nbPage.value
                return true
            }
            return false
        },
        async gotoPage(nbPageGo) {
            if (await gotoPage(nbPageGo)) {
                this.proprietaires = proprietaires.value
                this.page = page.value
                this.nbPage = nbPage.value
            }
        },
        setNewProprietaire() {
            this.newProprietaire = true
            this.proprietaire = {}
        }
    }
})