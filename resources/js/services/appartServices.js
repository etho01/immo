import { ref } from 'vue';
import axios from "./axios.js";

import { getErrors, checkIsLog} from './fonc.js';
import userStore from '../store/userStore.js';

export default function useAppart(){

    const apparts = ref([]);
    const appart = ref([]);

    let erreurTab = ref([]);

    let page = ref(1);
    let filtre;
    let nbPage = ref(0);

    const getApparts = async (data) => {
        filtre = data
        page.value = 1;
        await sendGetAppartsRequest()
    }

    const sendGetAppartsRequest = async (data) => {
        let response = await axios.get('/api/appart', {params: {...filtre, ...userStore.getInfosCallApi , page: page.value},
        ...userStore.getHeaderRequest})
        .catch(function (erreur){
            checkIsLog(erreur)
        });
        apparts.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendGetAppartsRequest();
    }


    const getAppart = async (id) => {
        let validate = true;
        let response = await axios.get('/api/appart/' + id, {params: { ...userStore.getInfosCallApi},
        ...userStore.getHeaderRequest})
            .catch(function(erreur) {
                checkIsLog(erreur)
                validate = false;
            })
        if ( validate ) appart.value = response.data.data;
        return validate;
    }

    const updateAppart = async (id, data) => {
        erreurTab.value = [];
        let response = await axios.put('/api/appart/'+ id,  {...data, ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        appart.value = response.data.data;
    }

    const deleteAppart = async (id) => {
        let response = await axios.delete('/api/appart/'+ id, { ...userStore.getInfosCallApi },
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
        });
        return true;
    }

    const createAppart = async (data) => {
        erreurTab.value = [];
        let response = await axios.post('/api/appart', { ...data, ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        if (erreurTab.value != []){
            return 0
        }
        return response.data.data.id
    }

    return {
        apparts,
        appart,
        getApparts,
        getAppart,
        updateAppart,
        deleteAppart,
        createAppart,
        page,
        gotoPage,
        nbPage,
        erreurTab
    }

}