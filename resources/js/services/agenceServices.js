import {ref} from "vue";
import axios from "axios";

export default function useAgence(){
    const agences = ref([]);

    const getAgences = async() => {
        let reponse = await axios.get('http://immo.test/api/agence');
        agences.value = reponse.data.data;
    }

    return {
        agences,
        getAgences
    }
}