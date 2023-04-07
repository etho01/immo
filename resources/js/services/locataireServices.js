import {ref} from "vue";
import axios from "axios";

export default function useLocataire(){

    const locataires = ref([]);
    const locataire = ref([]);

    let page = ref(1);
    let filtre;
    let nbPage = ref(0);

    const getLocataire = async (id) => {
        let response = await axios.get('http://immo.test/api/locataire/' + id);
        locataire.value  = response.data.data;
    }

    const getLocataires = async (data) => {
        filtre = data
        page.value = 1;
        await sendLocatairesRequest()
    }

    const sendLocatairesRequest = async (data) => {
        let response = await axios.get('http://immo.test/api/locataire', {params: {...filtre, page: page.value}});
        locataires.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendLocatairesRequest();
    }

    return {
        locataire,
        locataires,
        getLocataires,
        getLocataire,
        page,
        gotoPage,
        nbPage,
    }

}