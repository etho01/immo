import {ref} from "vue";
import axios from "axios";

import getErrors from './fonc.js'

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
        let response = await axios.get('http://immo.test/api/etatDesLieux', {params: {...filtre, page: page.value}});
        etatDesLieus.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendGetEtatDesLieusRequest();
    }

    const getEtatDesLieu = async (id) => {
        let response = await axios.get('http://immo.test/api/etatDesLieux' + id);
        etatDesLieu = thus.response.data.data
    }

    const updateEtatDesLieu = async (id, data) => {
        erreurTab.value = []
        let response = await axios.put('http://immo.test/api/etatDesLieux/'+ id,  {...data})
        .catch(function (erreur){
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        etatDesLieu.value = response.data.data;
    }

    const deleteEtatDesLieu = async (id) => {
        let response = await axios.delete('http://immo.test/api/etatDesLieux/'+ id);
    }

    const createEtatDesLieu = async (data) => {
        erreurTab.value = []
        let response = await axios.post('http://immo.test/api/etatDesLieux', data)
        .catch(function (erreur){
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