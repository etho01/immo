import { defineStore } from "pinia";

import userEtatDesLieu from '../services/etatDesLieuServices.js';

const {
    etatDesLieu,
    etatDesLieus,
    getEtatDesLieu,
    getEtatDesLieus,
    updateEtatDesLieu,
    deleteEtatDesLieu,
    createEtatDesLieu,
    page,
    gotoPage,
    nbPage,
    erreurTab,
    setEtatDesLieu,
    setEtatDesLieus,
    refreshErreur
} = userEtatDesLieu()

export const useEtatDesLieuStore = defineStore('etatDesLieu', {
    state: () => {
        return {
            etatDesLieus: [],
            etatDesLieu: {},
            page: 1,
            nbPage: 1,
            erreurTab,
            newEtatDesLieu : false,
            haveEtatDesLieuLoad: false,
        }
    },
    getters: {
        getEtatDesLieu: (state) => state.etatDesLieu,
        getEtatDesLieus: (state) => state.etatDesLieus,
        isNewEtatDesLieu: (state) => state.newEtatDesLieu
    },
    actions: {
        async updateEtatDesLieu(data) {
            if (this.haveEtatDesLieuLoad) {
                if ( await updateEtatDesLieu(this.getEtatDesLieu.id, data)) {
                    this.etatDesLieu = {...this.getEtatDesLieu, ...data}
                    return true
                }
            }
            return false
        },
        async deleteEtatDesLieu() {
            if (this.haveEtatDesLieuLoad) {
                if (await deleteEtatDesLieu(this.getEtatDesLieu.id)) {
                    this.haveEtatDesLieuLoad = false
                    this.etatDesLieu = {}
                    return true
                }
            }
            return false
        },
        async createEtatDesLieu(data) {
            let idNewEtatDesLieu = await createEtatDesLieu(data)
            if (idNewEtatDesLieu != 0) {
                await this.getEtatDesLieuById(idNewEtatDesLieu)
                this.newEtatDesLieu = false
                return idNewEtatDesLieu
            }
            return idNewEtatDesLieu
        },


        async getEtatDesLieuById(id) {
            if (await getEtatDesLieu(id)){
                this.etatDesLieu = etatDesLieu
                this.changeValueSetEtatDesLieu()
                return true
            }
            return false
        },

        getEtatDesLieuByObj(etatDesLieuObj) {
            this.etatDesLieu = etatDesLieuObj
            this.changeValueSetEtatDesLieu();
        },

        changeValueSetEtatDesLieu() {
            this.haveEtatDesLieuLoad = true
            this.newEtatDesLieu = false
            refreshErreur()
        },

        getEtatDesLieusByObj(etatDesLieusObj) {
            this.etatDesLieus = etatDesLieusObj
            this.changeValueSetEtatDesLieus()
        },

        async getEtatDesLieusByFiltre(filtre) {
            if (await getEtatDesLieus(filtre)) {
                this.etatDesLieus = etatDesLieus.value
                this.changeValueSetEtatDesLieus()
                return true
            }
            return false
        },

        changeValueSetEtatDesLieus() {
            this.page = page.value
            this.nbPage = nbPage.value
        },

        async gotoPage(nbPageGo) {
            if (await gotoPage(nbPageGo)) {
                this.etatDesLieus = etatDesLieus.value
                this.page = page.value
                this.nbPage = nbPage.value
            }
        },
        setNewEtatDesLieu() {
            this.newEtatDesLieu = true
            this.etatDesLieu = {}
        }
    }
})