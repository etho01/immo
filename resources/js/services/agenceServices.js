import {ref} from "vue";
import axios from "axios";

export default function useAgence(){
    const agences = ref([]);

    const getAgences = async(data) => {
        let reponse = await axios.get('/api/agence', {params: data});
        agences.value = reponse.data.data;
    }

    return {
        agences,
        getAgences
    }
}