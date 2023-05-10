import { ref } from 'vue';
import axios from "./axios.js";

import { getErrors, checkIsLog} from './fonc.js';
import userStore from "../store/userStore.js";

import Response from './servicesResponse.js';

export default function useServices (paramApi) {

    const getElement = async (id) => {
        let response = new Response();
        let resp = await axios.get('/api/' + paramApi + '/' + id, {params: { ...userStore.getInfosCallApi},
        ...userStore.getHeaderRequest})
        .catch(function (erreur){
            if (checkIsLog(erreur)){
                response.addError(erreur)
            }
        });
        response.addSuccess(resp)
        return response
    }

    const updateElement = async(id, data) => {
        let response = new Response();
        let resp = await axios.put('/api/' + paramApi + '/'+ id,  {...data, ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            if (checkIsLog(erreur)) {
                response.addError(erreur)
            }
        })
        response.addSuccess(resp)
        return response
    }

    const deleteElement = async(id) => {
        let response = new Response();
        let resp = await axios.delete('/api/' + paramApi + '/', { ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            if (checkIsLog(erreur)) {
                response.addError(erreur)
            }
        });
        response.addSuccess(resp)
        return response
    }

    const createElement = async (data) => {
        let response = new Response()
        let resp = await axios.post('/api/contrat', {...data,...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            if (checkIsLog(erreur)) {
                response.addError(erreur)
            }
        });
        response.addSuccess(resp)
        return response
    }

    return {
        getElement,
        updateElement,
        deleteElement,
        createElement
    }

}
