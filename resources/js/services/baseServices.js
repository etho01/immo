import { ref } from "vue";
import axios from "./axios.js";

import { getErrors, checkIsLog} from './fonc.js';
import userStoreLog from "../components/feature/user/userStoreLog.js";

export default function useServices(nomRoute) {
    // definie les elements recative qui seront utilisé par les stores
    const element = ref([]);
    const elements = ref([]);

    let erreurTab = ref([]);

    let page = ref(1);
    let filtre;
    let nbPage = ref(0);

    
    const getElement = async (id) => {
        let validate = true;
        let response = await axios.get('/api/' + nomRoute + '/'+ id, {params: { ...userStoreLog.getInfosCallApi},
        ...userStoreLog.getHeaderRequest} ). // envoie la requette
            catch(function (erreur){
                checkIsLog(erreur) // si erreur api
                validate = false;
            });

        if (validate) element.value = response.data.data; // change la value de l'element la requette a marcher
        return validate;
    }

    const deleteElement = async (id) => {
        let validate = true;
        let response = await axios.delete('/api/' + nomRoute + '/'+ id, 
        userStoreLog.getHeaderRequest)
            .catch(function (erreur){// envoie la requette
                checkIsLog(erreur) // si erreur api
                validate = false
            });
        return validate; // retourne si l'api a eu une erreir
    }

    const createElement = async (data) => {
        let validate = true
        erreurTab.value = []
        let response = await axios.post('/api/' + nomRoute , {...data,...userStoreLog.getInfosCallApi},
        userStoreLog.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
            erreurTab.value = getErrors(erreur.response.data.errors);
            let validate = false
        })
        if (validate){
            return response.data.data.id; // si l'api n'a pas eu d'erreur retourne l'id du nouvel element
        }
        return 0 
    }

    const updateElement = async (id, data) => {
        let validate = true
        erreurTab.value = []
        let response = await axios.put('/api/' + nomRoute + '/'+ id,  {...data, ...userStoreLog.getInfosCallApi},
        userStoreLog.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
            erreurTab.value = getErrors(erreur.response.data.errors);
            validate = false;
        })
        if (validate) {
            element.value = response.data.data;
        }
        return validate
    }

    const getElements = async (data) => { // referech la pagination quand de nouvea filtres sont envoyer
        filtre = data
        page.value = 1;
        return await sendGetElementsRequest()
    }

    const sendGetElementsRequest = async (data) => {
        let validate = true;
        let response = await axios.get('/api/' + nomRoute, {params: {...filtre, ...userStoreLog.getInfosCallApi, page: page.value},
        ...userStoreLog.getHeaderRequest}) // envoie de la requette
            .catch(function (erreur){
                checkIsLog(erreur) // si erreur
                validate = false
            });
        elements.value = response.data.data; // change les elements
        nbPage.value = response.data.meta.last_page; // change la valeur de la derneires page
        return validate
    }

    const gotoPage = async (newPage) => {
        page.value = newPage; // change la page
        return await sendGetElementsRequest();
    }

    const setError = (error) => {
        erreurTab.value = error; // set les erreurs
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