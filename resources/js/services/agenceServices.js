import {ref} from "vue";
import axios from "./axios.js";

import userStore from "../store/userStore";

export default function useAgence(){
    const agences = ref([]);

    const getAgences = async(data) => {
        let reponse = await axios.get('/api/agence', {params: {...data, ... userStore.getInfosCallApi }});
        agences.value = reponse.data.data;
    }

    return {
        agences,
        getAgences
    }
}