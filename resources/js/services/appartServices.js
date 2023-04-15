import { ref } from 'vue';
import axios from 'axios';

import getErrors from './fonc.js';

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
        let response = await axios.get('http://immo.test/api/appart', {params: {...filtre, page: page.value}});
        apparts.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendGetAppartsRequest();
    }


    const getAppart = async (id) => {
        let validate = true;
        let response = await axios.get('http://immo.test/api/appart/' + id)
            .catch(function(erreur) {
                validate = false;
            })
        if ( validate ) appart.value = response.data.data;
        return validate;
    }

    const updateAppart = async (id, data) => {
        erreurTab.value = [];
        let response = await axios.put('http://immo.test/api/appart/'+ id,  {...data})
        .catch(function (erreur){
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        appart.value = response.data.data;
    }

    const deleteAppart = async (id) => {
        let response = await axios.delete('http://immo.test/api/appart/'+ id);
        return true;
    }

    const createAppart = async (data) => {
        erreurTab.value = [];
        let response = await axios.post('http://immo.test/api/appart', data)
        .catch(function (erreur){
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