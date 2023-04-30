import {ref} from "vue";
import axios from "./axios.js";

import { getErrors, checkIsLog} from './fonc.js';
import userStore from "../store/userStore.js";

export default function useProprietaire(){

    const proprietaires = ref([]);
    const proprietaire = ref([]);

    let erreurTab = ref([])

    let page = ref(1);
    let filtre;
    let nbPage = ref(0);

    const getProprietaire = async (id) => {
        let validate = true;
        let response = await axios.get('/api/proprietaire/' + id, {params: {...userStore.getInfosCallApi},
        ...userStore.getHeaderRequest}).
            catch(function (erreur){
                checkIsLog(erreur)
                validate = false;
            });
        if (validate) proprietaire.value  = response.data.data;
        return validate
    }

    const getProprietaires = async (data) => {
        filtre = data
        page.value = 1;
        await sendProprietairesRequest()
    }

    const sendProprietairesRequest = async (data) => {
        let response = await axios.get('/api/proprietaire', {params: {...filtre, ...userStore.getInfosCallApi, page: page.value},
        ...userStore.getHeaderRequest})
        .catch(function (erreur){
            checkIsLog(erreur)
        });
        proprietaires.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendProprietairesRequest();
    }

    const updateProprietaire = async (id, data) => {
        erreurTab.value = []
        let response = await axios.put('/api/proprietaire/'+ id,  {...data, ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        proprietaire.value = response.data.data;
    }

    const deleteProprietaire = async (id) => {
        let response = await axios.delete('/api/proprietaire/'+ id, { ...userStore.getInfosCallApi},
        userStore.getHeaderRequest);
        return true;
    }

    const createProprietaire = async (data) => {
        erreurTab.value = []
        let response = await axios.post('/api/proprietaire', {data, ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        if (erreurTab.value != []){
            return 0;
        }
        return response.data.data.id;
    }

    return {
        proprietaire,
        proprietaires,
        getProprietaires,
        getProprietaire,
        updateProprietaire,
        deleteProprietaire,
        createProprietaire,
        page,
        gotoPage,
        nbPage,
        erreurTab
    }

}