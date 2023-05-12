import { ref } from "vue";
import axios from "./axios.js";

import { getErrors, checkIsLog} from './fonc.js';
import userStore from "../store/userStore.js";

export default function useServices(nomRoute) {
    const element = ref([]);
    const elements = ref([]);

    let erreurTab = ref([]);

    let page = ref(1);
    let filtre;
    let nbPage = ref(0);

    
    const getElement = async (id) => {
        let validate = true;
        let response = await axios.get('/api/' + nomRoute + '/'+ id, {params: { ...userStore.getInfosCallApi},
        ...userStore.getHeaderRequest} ).
            catch(function (erreur){
                checkIsLog(erreur)
                validate = false;
            });

        if (validate) element.value = response.data.data;
        return validate;
    }

    const deleteElement = async (id) => {
        let response = await axios.delete('/api/' + nomRoute + '/'+ id, { ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
            .catch(function (erreur){
                checkIsLog(erreur)
            });
        return true;
    }

    const createElement = async (data) => {
        erreurTab.value = []
        let response = await axios.post('/api/' + nomRoute , {...data,...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        if (erreurTab.value != []){
            return 0;
        }
        return response.data.data.id
    }

    const updateElement = async (id, data) => {
        erreurTab.value = []
        let response = await axios.put('/api/' + nomRoute + '/'+ id,  {...data, ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        element.value = response.data.data;
    }

    const getElements = async (data) => {
        filtre = data
        page.value = 1;
        await sendGetElementsRequest()
    }

    const sendGetElementsRequest = async (data) => {
        let response = await axios.get('/api/' + nomRoute, {params: {...filtre, ...userStore.getInfosCallApi, page: page.value},
        ...userStore.getHeaderRequest})
            .catch(function (erreur){
                checkIsLog(erreur)
            });
        elements.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendGetElementsRequest();
    }

    const setError = (error) => {
        erreurTab.value = error;
    }

    const refreshErreur = () => {
        setError([]);
    };

    const setElement = (newElement) => {
        element.value = element
    };

     const setElements = (newElements) => {
        elements.value = newElements
     }

    return {
        gotoPage,
        getElements,
        getElement,
        updateElement,
        deleteElement,
        createElement,
        setError,
        element,
        elements,
        page,
        nbPage,
        erreurTab,
        refreshErreur,
        setElement,
        setElements
    }
}