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
} = useServices('contrat');

export default function userContrat(){


    return {
        contrat: element,
        contrats: elements,
        getContrat: getElement,
        getContrats: getElements,
        updateContrat: updateElement,
        deleteContrat: deleteElement,
        createContrat: createElement,
        page,
        gotoPage,
        nbPage,
        erreurTab
    }

}