import {ref} from "vue";
import axios from "./axios.js";

import { getErrors, checkIsLog} from './fonc.js';
import userStore from "../store/userStore.js";

export default function useUser() {

    const users = ref([]);
    const user = ref([]);

    let erreurTab = ref([])

    let page = ref(1);
    let filtre;
    let nbPage = ref(0);

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

    const getUser = async (id) => {
        let validate = true;
        let response = await axios.get('/api/user/' + id, {params: {...userStore.getInfosCallApi},
        ...userStore.getHeaderRequest}).
            catch(function (erreur){
                checkIsLog(erreur)
                validate = false;
            });
        if (validate) user.value  = response.data.data;
        return validate
    }

    const getUsers = async (data) => {
        filtre = data
        page.value = 1;
        await sendUsersRequest()
    }

    const sendUsersRequest = async (data) => {
        let response = await axios.get('/api/user', {params: {...filtre, ...userStore.getInfosCallApi, page: page.value},
        ...userStore.getHeaderRequest})
        .catch(function (erreur){
            checkIsLog(erreur)
        });
        users.value = response.data.data;
        nbPage.value = response.data.meta.last_page;
    }

    const gotoPage = async (newPage) => {
        page.value = newPage;
        await sendUsersRequest();
    }

    const updateUser = async (id, data) => {
        erreurTab.value = []
        let response = await axios.put('/api/user/'+ id,  {...data, ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        user.value = response.data.data;
    }

    const deleteUser = async (id) => {
        let response = await axios.delete('/api/user/'+ id, { ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur) {
            checkIsLog(erreur)
        });
        return true;
    }

    const createUser = async (data) => {
        erreurTab.value = []
        let haveError = false;
        let response = await axios.post('/api/user', {...data, ...userStore.getInfosCallApi},
        userStore.getHeaderRequest)
        .catch(function (erreur){
            checkIsLog(erreur)
            haveError = true
            erreurTab.value = getErrors(erreur.response.data.errors);
        })
        if (haveError){
            return 0;
        }
        return response.data.data.id;
    }

    return {
        user,
        users,
        getUsers,
        getUser,
        updateUser,
        deleteUser,
        createUser,
        page,
        gotoPage,
        nbPage,
        erreurTab,
        logInApi
    }

}