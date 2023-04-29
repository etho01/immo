import {ref} from "vue";
import axios from "axios";

import { getErrors, checkIsLog} from './fonc.js';

export default function useUser() {

    let erreurTab = ref([]);

    const logInApi = async (email, password) => {
        let haveError = false;
        erreurTab.value = [];
        let response = await axios.get('/api/login', {params: {
            email,
            password
        }})
        .catch(function (erreur) {
            haveError = true
            erreurTab.value = getErrors(erreur.response.data.errors);
        });
        if (response.data.data == undefined){
            erreurTab.value = [
                'Utilisateur incorrecte'
            ];
        }
        if (!haveError){
            return response.data.data;
        }
        return [];

    }

    return {
        erreurTab,
        logInApi
    }

}