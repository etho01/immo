import {ref} from "vue";
import axios from "axios";

export default function useLocataire(){

    const locataires = ref([]);
    const locataire = ref([]);

    let page = ref(1);
    let filtre;
    let nbPage = ref(0);

    const getLocataire = async (id) => {
        let validate = true;
        let response = await axios.get('http://immo.test/api/locataire/' + id).
            catch(function (erreur){
                validate = false;
            });
        if (validate) locataire.value  = response.data.data;
        return validate
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

    const updateLocataire = async (id, data) => {
        let response = await axios.put('http://immo.test/api/locataire/'+ id,  {...data});
        locataire.value = response.data.data;
    }

    const deleteLocataire = async (id, router) => {
        let response = await axios.delete('http://immo.test/api/locataire/'+ id);
        router.push({ name: 'locataire.menu'})
    }

    const createLocataire = async (data, router) => {
        let response = await axios.post('http://immo.test/api/locataire', data)
        router.push({ name: 'locataire.show', params: { locataire_id: response.data.data.id } })
    }

    return {
        locataire,
        locataires,
        getLocataires,
        getLocataire,
        updateLocataire,
        deleteLocataire,
        createLocataire,
        page,
        gotoPage,
        nbPage,
    }

}