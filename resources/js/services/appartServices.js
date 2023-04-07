import { ref } from 'vue';
import axios from 'axios';

export default function useAppart(){

    const apparts = ref([]);
    const appart = ref([]);

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
        let response = await axios.get('http://immo.test/api/appart/' + id);
        appart.value = response.data.data;
    }

    return {
        apparts,
        appart,
        getApparts,
        getAppart,
        page,
        gotoPage,
        nbPage,
    }

}