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

    const sendPaiementsRequest = async (data) => {
        let response = await axios.get('http://immo.test/api/paiement', {params: {...filtre, page: page.value}});
        paiements.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendPaiementsRequest();
    }

    return {
        paiement,
        paiements,
        getPaiements,
        page,
        gotoPage,
        nbPage,
    }

}