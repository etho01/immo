import axios from "../../../services/axios.js";
import { ref } from "vue";
let erreurTab = ref([]);

export default function useQuittance() {
    let erreurTab = ref([]);

    const sendMailQuittance = async (contrat_id, data) => {
        let haveError = false
        let response = await axios.get('/api/contrat/sendMailQuittance/' + contrat_id,
        {params: {data}})
            .catch((error) => {
                erreurTab.value = ['Erreur le loyer n\'est pas entierement payé']
            })
    }

    const downloadQuittance = async (contrat_id, data) => {
        let haveError = false 
        let response = await axios.get('/api/contrat/downloadQuittance/' + contrat_id,
        { responseType: 'blob', params: {data}})
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
                erreurTab.value = ['Erreur le loyer n\'est pas entierement payé']
            })
    }

    return {
        downloadQuittance,
        sendMailQuittance,
        erreurTab
    }

}