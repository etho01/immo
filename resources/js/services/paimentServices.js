import {ref} from "vue";
import axios from "axios";

export default function usePaiement(){

    const paiements = ref([])
    const paiement = ref([])

    const getPaiements = async (data) => {
        let response = await axios.get('api/paiement', data);
        paiements.value = response.data.data;
    }

    return {
        paiement,
        paiements,
        getPaiements
    }

}