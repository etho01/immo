import {ref} from "vue";
import axios from "./axios.js";

import { getErrors, checkIsLog} from './fonc.js';
import userStore from "../store/userStore.js";

export default function useLocataire(){

    const locataires = ref([]);
    const locataire = ref([]);

    let erreurTab = ref([])

    let page = ref(1);
    let filtre;
    let nbPage = ref(0);

    const getLocataire = async (id) => {
        let validate = true;
        let response = await axios.get('/api/locataire/' + id, {params: {...userStore.getInfosCallApi},
        ...userStore.getHeaderRequest}).
            catch(function (erreur){
                checkIsLog(erreur)
                validate = false;
            });
        if (validate) locataire.value  = response.data.data;
        return validate
    }

    const getLocataires = async (data) => {
        filtre = data
        page.value = 1;
        await sendLocatairesRequest()
    }

    const sendLocatairesRequest = async (data) => {
        let response = await axios.get('/api/locataire', {params: {...filtre, ...userStore.getInfosCallApi, page: page.value},
        ...userStore.getHeaderRequest})
        .catch(function (erreur){
            checkIsLog(erreur)
        });
        locataires.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendLocatairesRequest();
    }

    const updateLocataire = async (id, data) => 
    {
        erreurTab.value = []
        let response = await axios.put('/api/locataire/'+ id,  {...data, ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        locataire.value = response.data.data;
    }

    const deleteLocataire = async (id) => {
        let response = await axios.delete('/api/locataire/'+ id, { ...userStore.getInfosCallApi},
        userStore.getHeaderRequest);
        return true;
    }

    const createLocataire = async (data) => {
        erreurTab.value = []
        let response = await axios.post('/api/locataire', {...data, ...userStore.getInfosCallApi},
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
        locataire,
        locataires,
        getLocataires,
        getLocataire,
        updateLocataire,
        deleteLocataire,
        createLocataire,
        page,
        gotoPage,
        nbPage,
        erreurTab
    }

}