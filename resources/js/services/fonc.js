const getErrors = function(erreur) {
    let erreurTab = new Array();
    console.log(erreur);
    Object.keys(erreur).forEach(element => {
        erreur[element].forEach(element2=> {
            erreurTab.push(element2)
        })
    });
    return erreurTab;
}

export default getErrors