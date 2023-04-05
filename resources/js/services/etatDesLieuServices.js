import {ref} from "vue";
import axios from "axios";

export default function useEtatDesLieu(){

    const etatDesLieus = ref([]);


    const getEtatDesLieus = async (data) => {
        let response = await axios.get('http://immo.test/api/EtatDesLieux', {params: data});
        etatDesLieus.value = response.data.data;
    }

    return {
        etatDesLieus,
        getEtatDesLieus
    }

}