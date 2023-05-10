import router from "../router";
import userStore from "../store/userStore.js";

const getErrors = function(erreur) {
    let erreurTab = new Array();
    Object.keys(erreur).forEach(element => {
        erreur[element].forEach(element2=> {
            erreurTab.push(element2)
        })
    });
    return erreurTab;
}

const checkIsLog = function(erreur) {
    if (erreur.response.status == 401){
        userStore.disconect()
        return false
    }
    return true
}

export {
    getErrors,
    checkIsLog
}