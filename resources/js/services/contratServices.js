import {ref} from "vue";
import axios from "./axios.js";

import getErrors from './fonc.js'
import userStore from "../store/userStore.js";

export default function userContrat(){

    const contrat = ref([]);
    const contrats = ref([]);

    let erreurTab = ref([]);

    let page = ref(1);
    let filtre;
    let nbPage = ref(0);

    const getContrat = async (id) => {
        let validate = true;
        let response = await axios.get('/api/contrat/'+ id, {params: { ...userStore.getInfosCallApi}} ).
            catch(function (erreur){
                validate = false;
            });

        if (validate) contrat.value = response.data.data;
        return validate;
    }

    const getContrats = async (data) => {
        filtre = data
        page.value = 1;
        await sendGetContratsRequest()
    }

    const sendGetContratsRequest = async (data) => {
        let response = await axios.get('/api/contrat', {params: {...filtre, ...userStore.getInfosCallApi, page: page.value}});
        contrats.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendGetContratsRequest();
    }

    const updateContrat = async (id, data) => {
        erreurTab.value = []
        let response = await axios.put('/api/contrat/'+ id,  {...data, ...userStore.getInfosCallApi})
        .catch(function (erreur){
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        contrat.value = response.data.data;
    }

    const deleteContrat = async (id) => {
        let response = await axios.delete('/api/contrat/'+ id, { ...userStore.getInfosCallApi});
        return true;
    }

    const createContrat = async (data) => {
        erreurTab.value = []
        let response = await axios.post('/api/contrat', {data,...userStore.getInfosCallApi})
        .catch(function (erreur){
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        if (erreurTab.value != []){
            return 0;
        }
        return response.data.data.id
    }

    return {
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
        erreurTab
    }

}