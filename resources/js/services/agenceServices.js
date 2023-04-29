import {ref} from "vue";
import axios from "./axios.js";

import userStore from "../store/userStore";
import { getErrors, checkIsLog} from './fonc.js';

export default function useAgence(){
    const agences = ref([]);

    const getAgences = async(data) => {
        let reponse = await axios.get('/api/agence', {params: {...data, ... userStore.getInfosCallApi },
         ...userStore.getHeaderRequest})
            .catch(function (erreur){
                checkIsLog(erreur)
            });
        agences.value = reponse.data.data;
    }

    return {
        agences,
        getAgences
    }
}