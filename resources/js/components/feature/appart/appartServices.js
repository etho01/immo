import { ref } from 'vue';
import axios from "../../../services/axios.js";

import { getErrors, checkIsLog} from '../../../services/fonc.js';
import userStoreLog from '../user/userStoreLog.js';

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
} = useServices('appart');

export default function useAppart(){

    return {
        apparts: elements,
        appart: element,
        getApparts: getElements,
        getAppart: getElement,
        updateAppart: updateElement,
        deleteAppart: deleteElement,
        createAppart: createElement,
        page,
        gotoPage,
        nbPage,
        erreurTab,
        setAppart: setElement,
        setApparts: setElements,
        refreshErreur
    }

}