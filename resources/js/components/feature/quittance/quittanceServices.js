import axios from "../../../services/axios.js";
import { ref } from "vue";
import userStoreLog from "../user/userStoreLog.js";
let erreurTab = ref([]);

export default function useQuittance() {
    let erreurTab = ref([]); // set un tableau modififiable et reactive

    const sendMailQuittance = async (contrat_id, data) => {
        erreurTab.value = []
        let haveError = false
        let response = await axios.get('/api/contrat/sendMailQuittance/' + contrat_id, // envoie l'appel que l'api doit envoyer le mail
        {params: data,  ...userStoreLog.getHeaderRequest})
            .catch((error) => {
                erreurTab.value = ['Erreur']
                haveError = true
            })
        return !haveError
    }

    const downloadQuittance = async (contrat_id, data) => {
        let haveError = false 
        erreurTab.value = []
        let response = await axios.get('/api/contrat/downloadQuittance/' + contrat_id,
        { responseType: 'blob', params: data, ...userStoreLog.getHeaderRequest})
            .then((response) => {
                console.log(response);
                const href = URL.createObjectURL(response.data);

                // create "a" HTML element with href to file & click
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', 'Quittance.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click();
            
                // clean up "a" element & remove ObjectURL
                document.body.removeChild(link);
                URL.revokeObjectURL(href);
            })
            .catch((error) => {
                erreurTab.value = ['Erreur']
                haveError = true
            })
        return !haveError
    }

    return {
        downloadQuittance,
        sendMailQuittance,
        erreurTab
    }

}