import { defineStore } from "pinia";
import { useProprietaireStore } from '../proprietaire/proprioStore.js';
import { useContratStore } from '../contrat/contratStore.js';

import useAppart from './appartServices.js';

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
            haveAppartLoad: false,
            proprietaire: useProprietaireStore(),
            contrat: useContratStore()
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
                this.changeValueSetAppart()
                return true
            }
            return false
        },

        getAppartByObj(appartObj) {
            this.appart = appartObj
            this.changeValueSetAppart()
        },

        changeValueSetAppart() {
            this.haveAppartLoad = true
            this.newAppart = false
            refreshErreur(),
            this.contrat.getContratsByFiltre({appart_id: this.getAppart.id})
            this.proprietaire.getProprietaireByObjet(this.getAppart.proprietaire)
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