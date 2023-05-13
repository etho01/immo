import {ref} from "vue";
import axios from "../../../services/axios.js";

import { getErrors, checkIsLog} from '../../../services/fonc.js';
import userStore from "../user/userStore.js";

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
    refreshErreur,
    setElement,
    setElements
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
        refreshErreur,
        setPaiement: setElement,
        setPaiements: setElements
    }

}