import {ref} from "vue";
import axios from "axios";

export default function userContrat(){

    const contrat = ref([]);
    const contrats = ref([]);

    let page = ref(1);
    let filtre;
    let nbPage = ref(0);

    const getContrat = async (id) => {
        let validate = true;
        let response = await axios.get('http://immo.test/api/contrat/'+ id ).
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
        let response = await axios.get('http://immo.test/api/contrat', {params: {...filtre, page: page.value}});
        contrats.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendGetContratsRequest();
    }

    const updateContrat = async (id, data) => {
        let response = await axios.put('http://immo.test/api/contrat/'+ id,  {...data});
        contrat.value = response.data.data;
    }

    const deleteContrat = async (id) => {
        let response = await axios.delete('http://immo.test/api/contrat/'+ id);
        return true;
    }

    const createContrat = async (data) => {
        let response = await axios.post('http://immo.test/api/contrat', data)
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
    }

}