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
    erreurTab,
    setElement,
    setElements,
    refreshErreur
} = useServices('agence');

export default function useAgence(){

    return {
        agence :element,
        agences: elements,
        getAgences: getElements,
        getAgence: getElement,
        updateAgence: updateElement,
        deleteAgence: deleteElement,
        createAgence: createElement,
        page,
        gotoPage,
        nbPage,
        erreurTab,
        setAgence: setElement,
        setAgences: setElements,
        refreshErreur
    }

}