import {ref} from "vue";
import axios from "./axios.js";

import { getErrors, checkIsLog} from './fonc.js';
import userStore from "../store/userStore.js";

export default function useEtatDesLieu(){

    const etatDesLieus = ref([]);
    const etatDesLieu = ref([]);

    let erreurTab = ref([])

    let page = ref(1);
    let filtre;
    let nbPage = ref(0);


    const getEtatDesLieus = async (data) => {
        filtre = data
        page.value = 1;
        await sendGetEtatDesLieusRequest()
    }

    const sendGetEtatDesLieusRequest = async (data) => {
        let response = await axios.get('/api/etatDesLieux', {params: {...filtre, ...userStore.getInfosCallApi, page: page.value},
        ...userStore.getHeaderRequest})
        .catch(function (erreur){
            checkIsLog(erreur)
        });
        etatDesLieus.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendGetEtatDesLieusRequest();
    }

    const getEtatDesLieu = async (id) => {
        let response = await axios.get('/api/etatDesLieux' + id, {params: {...userStore.getInfosCallApi},
        ...userStore.getHeaderRequest})
        .catch(function (erreur){
            checkIsLog(erreur)
        });
        etatDesLieu.value = response.data.data
    }

    const updateEtatDesLieu = async (id, data) => {
        erreurTab.value = []
        let response = await axios.put('/api/etatDesLieux/'+ id,  {...data, ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        etatDesLieu.value = response.data.data;
    }

    const deleteEtatDesLieu = async (id) => {
        let response = await axios.delete('/api/etatDesLieux/'+ id, {...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
        });
    }

    const createEtatDesLieu = async (data) => {
        erreurTab.value = []
        let response = await axios.post('/api/etatDesLieux', {...data, ...userStore.getInfosCallApi},
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
        etatDesLieu,
        etatDesLieus,
        getEtatDesLieus,
        getEtatDesLieu,
        createEtatDesLieu,
        deleteEtatDesLieu,
        updateEtatDesLieu,
        page,
        gotoPage,
        nbPage,
        erreurTab,
        refreshErreur
    }

}