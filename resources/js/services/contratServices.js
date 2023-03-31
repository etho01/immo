import {ref} from "vue";
import axios from "axios";

export default function userContrat(){

    const contrat = ref([]);
    const contrats = ref([]);


    const getContrat = async (id) => {
        let response = await axios.get('api/contrat/'+ id );
        contrat.value = response.data.data;
    }

    const getContrats = async () => {
        let response = await axios.get('api/contrat');
        contrats.value = response.data.data;
    }

    return {
        contrat,
        contrats,
        getContrat,
        getContrats
    }

}