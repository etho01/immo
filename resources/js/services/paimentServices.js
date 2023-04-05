import {ref} from "vue";
import axios from "axios";

export default function usePaiement(){

    const paiements = ref([])
    const paiement = ref([])

    const getPaiements = async (data) => {
        let response = await axios.get('http://immo.test/api/paiement', {params: data});
        paiements.value = response.data.data;
    }

    return {
        paiement,
        paiements,
        getPaiements
    }

}