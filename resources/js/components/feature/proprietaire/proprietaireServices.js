import {ref} from "vue";
import axios from "../../../services/axios.js";

import { getErrors, checkIsLog} from '../../../services/fonc.js';
import userStoreLog from "../user/userStoreLog.js";

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
        erreurTab,
        setProprietaire: setElement,
        setProprietaires: setElements,
        refreshErreur
    }

}