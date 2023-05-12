import {ref} from "vue";
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
} = useServices('proprietaire');

export default function useProprietaire(){

    return {
        proprietaire: element,
        proprietaires: elements,
        getProprietaires: getElements,
        getProprietaire: getElement,
        updateProprietaire: updateElement,
        deleteProprietaire: deleteElement,
        createProprietaire: createElement,
        page,
        gotoPage,
        nbPage,
        erreurTab
    }

}