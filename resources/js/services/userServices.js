import {ref, computed} from "vue";
import axios from "./axios.js";

import { getErrors, checkIsLog} from './fonc.js';
import userStore from "../store/userStore.js";

import  useServices from './baseServices.js'

const {
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
    erreurTab
} = useServices('user');

export default function useUser() {

    const logInApi = async (email, password) => {
        let haveError = false;
        erreurTab.value = [];
        let response = await axios.get('/api/login', {params: {
            email,
            password
        }})
        .catch(function (erreur) {
            haveError = true
            setError(getErrors(erreur.response.data.errors))
        });
        if (response.data.data == undefined){
            setError(erreurTab.value = [
                'Utilisateur incorrecte'
            ]);
        }
        if (!haveError){
            return response.data.data;
        }
        return [];

    }

    return {
        user: element,
        users: elements,
        getUsers: getElements,
        getUser: getElement,
        updateUser: updateElement,
        deleteUser: deleteElement,
        createUser: createElement,
        page,
        gotoPage,
        nbPage,
        erreurTab,
        logInApi
    }

}