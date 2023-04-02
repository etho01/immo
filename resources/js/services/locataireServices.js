import {ref} from "vue";
import axios from "axios";

export default function useLocataire(){

    const locataires = ref([]);
    const locataire = ref([]);

    const getLocataires = async () => {
        let response = await axios.get('http://immo.test/api/locataire');
        locataires.value = response.data.data;
    }

    return {
        locataire,
        locataires,
        getLocataires
    }

}