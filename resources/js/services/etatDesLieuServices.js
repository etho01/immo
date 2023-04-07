import {ref} from "vue";
import axios from "axios";

export default function useEtatDesLieu(){

    const etatDesLieus = ref([]);

    let page = ref(1);
    let filtre;
    let nbPage = ref(0);


    const getEtatDesLieus = async (data) => {
        filtre = data
        page.value = 1;
        await sendGetEtatDesLieusRequest()
    }

    const sendGetEtatDesLieusRequest = async (data) => {
        let response = await axios.get('http://immo.test/api/EtatDesLieux', {params: {...filtre, page: page.value}});
        etatDesLieus.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendGetEtatDesLieusRequest();
    }

    return {
        etatDesLieus,
        getEtatDesLieus,
        page,
        gotoPage,
        nbPage,
    }

}