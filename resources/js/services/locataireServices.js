import {ref} from "vue";
import axios from "axios";

export default function useLocataire(){

    const locataires = ref([]);
    const locataire = ref([]);

    const getLocataires = async (data) => {
        let response = await axios.get('http://immo.test/api/locataire', {params: data});
        locataires.value = response.data.data;
    }

    return {
        locataire,
        locataires,
        getLocataires
    }

}