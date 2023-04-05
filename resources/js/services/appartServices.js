import { ref } from 'vue';
import axios from 'axios';

export default function useAppart(){

    const apparts = ref([]);
    const appart = ref([]);

    const getApparts = async (data) => {
        let response = await axios.get('http://immo.test/api/appart', {params: data});
        apparts.value =  response.data.data;
    }

    const getAppart = async (id) => {
        let response = await axios.get('http://immo.test/api/appart/' + id);
        appart.value = response.data.data;
    }

    return {
        apparts,
        appart,
        getApparts,
        getAppart
    }

}