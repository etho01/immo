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
    setElements,
} = useServices('locataire');

export default function useLocataire(){

    return {
        locataire: element,
        locataires: elements,
        getLocataires: getElements,
        getLocataire: getElement,
        updateLocataire: updateElement,
        deleteLocataire: deleteElement,
        createLocataire: createElement,
        page,
        gotoPage,
        nbPage,
        erreurTab,
        setLocataire: setElement,
        setLocataires: setElements,
        refreshErreur
    }

}