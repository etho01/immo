import { defineStore } from "pinia";
import {useContratStore} from './contratStore'

import userLocataire from '../services/LocataireServices.js';

const {
    locataire,
    locataires,
    getLocataire,
    getLocataires,
    updateLocataire,
    deleteLocataire,
    createLocataire,
    page,
    gotoPage,
    nbPage,
    erreurTab,
    setLocataire,
    setLocataires,
    refreshErreur
} = userLocataire()

export const useLocataireStore = defineStore('locataire', {
    state: () => {
        return {
            locataires: [],
            locataire: {},
            page: 1,
            nbPage: 1,
            erreurTab,
            newLocataire : false,
            haveLocataireLoad: false,
            contrat : useContratStore()
        }
    },
    getters: {
        getLocataire: (state) => state.locataire,
        getLocataires: (state) => state.locataires,
        isNewLocataire: (state) => state.newLocataire
    },
    actions: {
        async updateLocataire(data) {
            if (this.haveLocataireLoad) {
                if ( await updateLocataire(this.getLocataire.id, data)) {
                    this.locataire = {...this.getLocataire, ...data}
                    return true
                }
            }
            return false
        },
        async deleteLocataire() {
            if (this.haveLocataireLoad) {
                if (await deleteLocataire(this.getLocataire.id)) {
                    this.haveLocataireLoad = false
                    this.locataire = {}
                    return true
                }
            }
            return false
        },
        async createLocataire(data) {
            let idNewLocataire = await createLocataire(data)
            if (idNewLocataire != 0) {
                await this.getLocataireById(idNewLocataire)
                this.newLocataire = false
                return idNewLocataire
            }
            return idNewLocataire
        },


        async getLocataireById(id) {
            if (await getLocataire(id)){
                this.locataire = locataire
                this.haveLocataireLoad = true
                this.newLocataire = false
                refreshErreur()
                this.contrat.getContratsByFiltre({locataire_id: id})
                return true
            }
            return false
        },

        async getLocatairesByFiltre(filtre) {
            if (await getLocataires(filtre)) {
                this.locataires = locataires.value
                this.page = page.value
                this.nbPage = nbPage.value
                return true
            }
            return false
        },
        async gotoPage(nbPageGo) {
            if (await gotoPage(nbPageGo)) {
                this.locataires = locataires.value
                this.page = page.value
                this.nbPage = nbPage.value
            }
        },
        setNewLocataire() {
            this.newLocataire = true
            this.locataire = {}
        }
    }
})