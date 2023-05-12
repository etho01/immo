import { ref } from 'vue';
import axios from "./axios.js";

import { getErrors, checkIsLog} from './fonc.js';
import userStore from '../store/userStore.js';

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
        erreurTab
    }

}