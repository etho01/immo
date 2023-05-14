import { defineStore } from "pinia";

import  useServices from '../../../services/baseServices.js'

import { deleteUndefine } from "../../../store/fonc";

const {
    getElement,
    updateElement,
    deleteElement,
    createElement,
    element,
    erreurTab,
    refreshErreur,
} = useServices('depotDeGarantie');


export const useDepotDeGarantieStore = defineStore('depotDeGarantie', {
    state: () => {
        return {
            depotDeGaranties: [],
            depotDeGarantie: {},
            erreurTab,
            newDepotDeGarantie : false,
            haveDepotDeGarantieLoad: false,
        }
    },
    getters: {
        getDepotDeGarantie: (state) => state.depotDeGarantie,
        getDepotDeGaranties: (state) => state.depotDeGaranties,
        isNewDepotDeGarantie: (state) => state.newDepotDeGarantie
    },
    actions: {
        async updateDepotDeGarantie(data) {
            if (this.haveDepotDeGarantieLoad) {
                if ( await updateElement(this.getDepotDeGarantie.id, data)) {
                    this.depotDeGarantie = {...this.getDepotDeGarantie, ...deleteUndefine(data)}
                    return true
                }
            }
            return false
        },
        async deleteDepotDeGarantie() {
            if (this.haveDepotDeGarantieLoad) {
                if (await deleteElement(this.getDepotDeGarantie.id)) {
                    this.haveDepotDeGarantieLoad = false
                    this.depotDeGarantie = {}
                    return true
                }
            }
            return false
        },
        async createDepotDeGarantie(data) {
            let idNewDepotDeGarantie = await createElement(data)
            if (idNewDepotDeGarantie != 0) {
                await this.getDepotDeGarantieById(idNewDepotDeGarantie)
                this.newDepotDeGarantie = false
                return idNewDepotDeGarantie
            }
            return idNewDepotDeGarantie
        },


        async getDepotDeGarantieById(id) {
            if (await getElement(id)){
                this.depotDeGarantie = {...element.value}
                this.changeValueSetDepotDeGarantie()
                return true
            }
            return false
        },

        getDepotDeGarantieByObj(depotDeGarantieObj) {
            this.depotDeGarantie = depotDeGarantieObj
            this.changeValueSetDepotDeGarantie();
        },

        changeValueSetDepotDeGarantie() {
            this.haveDepotDeGarantieLoad = true
            this.newDepotDeGarantie = false
            refreshErreur()
        },

        setNewDepotDeGarantie() {
            this.newDepotDeGarantie = true
            this.depotDeGarantie = {}
        }
    }
})