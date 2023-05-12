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
    refreshErreur
} = useServices('paiement');

export default function usePaiement(){

    return {
        paiement: element,
        paiements: elements,
        getPaiements: getElements,
        getPaiement: getElement,
        updatePaiement: updateElement,
        deletePaiement: deleteElement,
        createPaiement: createElement,
        page,
        gotoPage,
        nbPage,
        erreurTab,
        refreshErreur
    }

}