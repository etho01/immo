import { defineStore } from "pinia";

import useAppart from '../services/appartServices.js';

const {
    appart,
    apparts,
    getAppart,
    getApparts,
    updateAppart,
    deleteAppart,
    createAppart,
    page,
    gotoPage,
    nbPage,
    erreurTab,
    setAppart,
    setApparts,
    refreshErreur
} = useAppart()

export const useAppartStore = defineStore('appart', {
    state: () => {
        return {
            apparts: [],
            appart: {},
            page: 1,
            nbPage: 1,
            erreurTab,
            newAppart : false,
            haveAppartLoad: false
        }
    },
    getters: {
        getAppart: (state) => state.appart,
        getApparts: (state) => state.apparts,
        isNewAppart: (state) => state.newAppart
    },
    actions: {
        async updateAppart(data) {
            if (this.haveAppartLoad) {
                if ( await updateAppart(this.getAppart.id, data)) {
                    this.appart = {...this.getAppart, ...data}
                    return true
                }
            }
            return false
        },
        async deleteAppart() {
            if (this.haveAppartLoad) {
                if (await deleteAppart(this.getAppart.id)) {
                    this.haveAppartLoad = false
                    this.appart = {}
                    return true
                }
            }
            return false
        },
        async createAppart(data) {
            let idNewAppart = await createAppart(data)
            if (idNewAppart != 0) {
                await this.getAppartById(idNewAppart)
                this.newAppart = false
                return idNewAppart
            }
            return idNewAppart
        },


        async getAppartById(id) {
            if (await getAppart(id)){
                this.appart = appart
                this.haveAppartLoad = true
                this.newAppart = false
                refreshErreur()
                return true
            }
            return false
        },

        async getAppartsByFiltre(filtre) {
            if (await getApparts(filtre)) {
                this.apparts = apparts.value
                this.page = page.value
                this.nbPage = nbPage.value
                return true
            }
            return false
        },
        async gotoPage(nbPageGo) {
            if (await gotoPage(nbPageGo)) {
                this.apparts = apparts.value
                this.page = page.value
                this.nbPage = nbPage.value
            }
        },
        setNewAppart() {
            this.newAppart = true
            this.appart = {}
        }
    }
})