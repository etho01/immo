import { defineStore } from "pinia";
import { useAppartStore } from '../appart/appartStore';
import { useLocataireStore } from '../locataire/locataireStore'
import { usePaiementStore } from '../paiement/paiementStore'
import { useEtatDesLieuStore } from '../etatDesLieu/etatDesLieuStore';
import { useDepotDeGarantieStore } from '../depotDeGarantie/depotDeGarantieStore'

import userContrat from './contratServices.js';

import { deleteUndefine } from "../../../store/fonc";

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
} = userContrat() // get les elements de l'api

export const useContratStore = defineStore('contrat', {
    state: () => {
        return {
            contrats: [], // liste des contrats
            contrat: {}, // contrat
            page: 1, // page actuel
            nbPage: 1, // nombre de page
            erreurTab, // tableau d'erreur
            newContrat : false, // si c'est un nex contrat
            haveContratLoad: false, // save si un contrat est load
            locataire: useLocataireStore(),
            appart: useAppartStore(),
            paiement: usePaiementStore(),
            etatDesLieu: useEtatDesLieuStore(),
            depotDeGarantie: useDepotDeGarantieStore()
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
                if ( await updateContrat(this.getContrat.id, data)) { // si la modification n'a pas echouer
                    this.contrat = {...this.getContrat, ...deleteUndefine(data)}
                    return true
                }
            }
            return false
        },
        async deleteContrat() {
            if (this.haveContratLoad) {
                if (await deleteContrat(this.getContrat.id)) {  // si la suppression n'a pas echouer
                    this.haveContratLoad = false
                    this.contrat = {}
                    return true
                }
            }
            return false
        },
        async createContrat(data) {
            let idNewContrat = await createContrat(data) //  // si la création n'a pas echouer
            if (idNewContrat != 0) {
                await this.getContratById(idNewContrat)
                this.newContrat = false
                return idNewContrat
            }
            return idNewContrat
        },


        async getContratById(id) {
            if (await getContrat(id)){
                this.contrat = {...contrat.value}
                this.changeValueSetContrat()
                return true
            }
            return false
        },

        changeValueSetContrat() { // change la valeur des donnée aussin que les stores des composant enfant qaund un nouveau contrat est charger
            this.haveContratLoad = true
            this.newContrat = false
            this.locataire.getLocataireByObject(this.getContrat.locataire)
            this.appart.getAppartByObj(this.getContrat.appart)
            this.paiement.getPaiementsByObj(this.getContrat.paiement)
            this.etatDesLieu.getEtatDesLieusByObj(this.getContrat.etat_des_lieu)
            if (this.getContrat.depot_de_garantie == null) {
                this.depotDeGarantie.setNewDepotDeGarantie()
            } else {
                this.depotDeGarantie.getDepotDeGarantieByObj(this.getContrat.depot_de_garantie)

            }
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