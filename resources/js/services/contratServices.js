import {ref} from "vue";
import axios from "axios";

export default function userContrat(){

    const contrat = ref([]);
    const contrats = ref([]);

    let page = ref(1);
    let filtre;
    let nbPage = ref(0);

    const getContrat = async (id) => {
        let response = await axios.get('http://immo.test/api/contrat/'+ id );
        contrat.value = response.data.data;
    }

    const getContrats = async (data) => {
        filtre = data
        page.value = 1;
        await sendGetContratsRequest()
    }

    const sendGetContratsRequest = async (data) => {
        let response = await axios.get('http://immo.test/api/contrat', {params: {...filtre, page: page.value}});
        contrats.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
        console.log(nbPage.value);
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendGetContratsRequest();
    }

    return {
        contrat,
        contrats,
        getContrat,
        getContrats,
        page,
        gotoPage,
        nbPage,
    }

}