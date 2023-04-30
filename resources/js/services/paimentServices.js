import {ref} from "vue";
import axios from "./axios.js";

import { getErrors, checkIsLog} from './fonc.js';
import userStore from "../store/userStore.js";

export default function usePaiement(){

    const paiements = ref([])
    const paiement = ref([])

    let erreurTab = ref([])

    let page = ref(1);
    let filtre;
    let nbPage = ref(0);

    const getPaiements = async (data) => {
        filtre = data
        page.value = 1;
        await sendPaiementsRequest()
    }

    const getPaiement = async (id) => {
        let response = await axios.get('/api/paiement/' + id, {params: {...userStore.getInfosCallApi},
        ...userStore.getHeaderRequest})
        .catch(function (erreur){
            checkIsLog(erreur)
        });
        paiement.value = response.data.data
    }

    const sendPaiementsRequest = async (data) => {
        let response = await axios.get('/api/paiement', {params: {...filtre, ...userStore.getInfosCallApi, page: page.value},
        ...userStore.getHeaderRequest})
        .catch(function (erreur){
            checkIsLog(erreur)
        });
        paiements.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendPaiementsRequest();
    }

    const updatePaiement = async (id, data) => {
        erreurTab.value = []
        let response = await axios.put('/api/paiement/'+ id,  {...data, ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        paiement.value = response.data.data;
    }

    const deletePaiement = async (id) => {
        let response = await axios.delete('/api/paiement/'+ id, {...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
        });
    }

    const createPaiement = async (data) => {
        erreurTab.value = []
        let response = await axios.post('/api/paiement', {...data, ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        if (erreurTab.value != []){
            return 0;
        }
    }

    const refreshErreur = () => {
        erreurTab.value = []
    };

    return {
        paiement,
        paiements,
        getPaiements,
        getPaiement,
        updatePaiement,
        deletePaiement,
        createPaiement,
        page,
        gotoPage,
        nbPage,
        erreurTab,
        refreshErreur
    }

}