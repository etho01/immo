import {ref} from "vue";
import axios from "./axios.js";

import { getErrors, checkIsLog} from './fonc.js';
import userStore from "../store/userStore.js";

export default function useAgence(){

    const agences = ref([]);
    const agence = ref([]);

    let erreurTab = ref([])

    let page = ref(1);
    let filtre;
    let nbPage = ref(0);

    const getAgence = async (id) => {
        let validate = true;
        let response = await axios.get('/api/agence/' + id, {params: {...userStore.getInfosCallApi},
        ...userStore.getHeaderRequest}).
            catch(function (erreur){
                checkIsLog(erreur)
                validate = false;
            });
        if (validate) agence.value  = response.data.data;
        return validate
    }

    const getAgences = async (data) => {
        filtre = data
        page.value = 1;
        await sendAgencesRequest()
    }

    const sendAgencesRequest = async (data) => {
        let response = await axios.get('/api/agence', {params: {...filtre, ...userStore.getInfosCallApi, page: page.value},
        ...userStore.getHeaderRequest})
        .catch(function (erreur){
            checkIsLog(erreur)
        });
        agences.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendAgencesRequest();
    }

    const updateAgence = async (id, data) => {
        erreurTab.value = []
        let response = await axios.put('/api/agence/'+ id,  {...data, ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        agence.value = response.data.data;
    }

    const deleteAgence = async (id) => {
        let response = await axios.delete('/api/agence/'+ id, { ...userStore.getInfosCallApi},
        userStore.getHeaderRequest);
        return true;
    }

    const createAgence = async (data) => {
        erreurTab.value = []
        let haveError = false;
        let response = await axios.post('/api/agence', {...data, ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
            haveError = true
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        if (haveError){
            return 0;
        }
        return response.data.data.id;
    }

    return {
        agence,
        agences,
        getAgences,
        getAgence,
        updateAgence,
        deleteAgence,
        createAgence,
        page,
        gotoPage,
        nbPage,
        erreurTab
    }

}