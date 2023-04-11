import {ref} from "vue";
import axios from "axios";

export default function usePaiement(){

    const paiements = ref([])
    const paiement = ref([])

    let page = ref(1);
    let filtre;
    let nbPage = ref(0);

    const getPaiements = async (data) => {
        filtre = data
        page.value = 1;
        await sendPaiementsRequest()
    }

    const getPaiement = async (id) => {
        let response = await axios.get('http://immo.test/api/paiement/' + id);
        paiement = response.data.data
    }

    const sendPaiementsRequest = async (data) => {
        let response = await axios.get('http://immo.test/api/paiement', {params: {...filtre, page: page.value}});
        paiements.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendPaiementsRequest();
    }

    const updatePaiement = async (id, data) => {
        let response = await axios.put('http://immo.test/api/paiement/'+ id,  {...data});
        paiement.value = response.data.data;
    }

    const deletePaiement = async (id) => {
        let response = await axios.delete('http://immo.test/api/paiement/'+ id);
    }

    const createPaiement = async (data) => {
        let response = await axios.post('http://immo.test/api/paiement', data)
    }

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
    }

}