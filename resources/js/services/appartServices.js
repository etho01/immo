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
        let validate = true;
        let response = await axios.get('http://immo.test/api/appart/' + id)
            .catch(function(erreur) {
                validate = false;
            })
        if ( validate ) appart.value = response.data.data;
        return validate;
    }

    const updateAppart = async (id, data) => {
        let response = await axios.put('http://immo.test/api/appart/'+ id,  {...data});
        appart.value = response.data.data;
    }

    const deleteAppart = async (id, router) => {
        let response = await axios.delete('http://immo.test/api/appart/'+ id);
        router.push({ name: 'appart.menu'})
    }

    const createAppart = async (data, router) => {
        let response = await axios.post('http://immo.test/api/appart', data)
        router.push({ name: 'appart.show', params: { appart_id: response.data.data.id } })
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
    }

}