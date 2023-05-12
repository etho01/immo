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
} = useServices('etatDesLieux');

export default function useEtatDesLieu(){

    return {
        etatDesLieu :element,
        etatDesLieus: elements,
        getEtatDesLieus: getElements,
        getEtatDesLieu: getElement,
        createEtatDesLieu: createElement,
        deleteEtatDesLieu: deleteElement,
        updateEtatDesLieu: updateElement,
        page,
        gotoPage,
        nbPage,
        erreurTab,
        refreshErreur
    }

}