import { ref } from 'vue';
import axios from 'axios';

export default function useAppart(){

    const apparts = ref([]);
    const appart = ref([]);

    const getApparts = async () => {
        let response = axios.get('api/appart');
        apparts.value = (await response).data.data;
    }

    return {
        apparts,
        appart,
        getApparts
    }

}