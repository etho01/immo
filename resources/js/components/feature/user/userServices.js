import {ref, computed} from "vue";
import axios from "../../../services/axios.js";
    // voir contrat
import { getErrors, checkIsLog} from '../../../services/fonc.js';
import userStoreLog from "./userStoreLog.js";

import  useServices from '../../../services/baseServices.js'

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
    erreurTab,
    setElement,
    setElements,
    refreshErreur
} = useServices('user');

export default function useUser() {

    const logInApi = async (email, password) => {
        let haveError = false;
        erreurTab.value = [];
        let response = await axios.get('/api/login', {params: {
            email,
            password
        }}) // envoie la requette pour se log
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
        logInApi,
        setUser: setElement,
        setUsers: setElements,
        refreshErreur
    }

}