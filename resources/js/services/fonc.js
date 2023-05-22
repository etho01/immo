import router from "../router";
import userStoreLog from "../components/feature/user/userStoreLog.js";

// convertie le format d'erreur de l'api en un format compatible pour le composant error
const getErrors = function(erreur) {
    let erreurTab = new Array();
    Object.keys(erreur).forEach(element => {
        erreur[element].forEach(element2=> {
            erreurTab.push(element2)
        })
    });
    return erreurTab;
}

// si l'api renvoie une erreur comme quoi l'utilisateur est deconcter alors je le deconnecte
const checkIsLog = function(erreur) {
    if (erreur.response.status == 401){
        userStoreLog.disconect()
    }
}

export {
    getErrors,
    checkIsLog
}