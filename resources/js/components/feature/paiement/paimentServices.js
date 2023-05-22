import  useServices from '../../../services/baseServices.js'
// voir contrat
const {
    gotoPage,
    getElements,
    getElement,
    updateElement,
    deleteElement,
    createElement,
    setError,
    element,
    elements,
    page,
    nbPage,
    erreurTab,
    refreshErreur,
    setElement,
    setElements
} = useServices('paiement');

export default function usePaiement(){

    return {
        paiement: element,
        paiements: elements,
        getPaiements: getElements,
        getPaiement: getElement,
        updatePaiement: updateElement,
        deletePaiement: deleteElement,
        createPaiement: createElement,
        page,
        gotoPage,
        nbPage,
        erreurTab,
        refreshErreur,
        setPaiement: setElement,
        setPaiements: setElements
    }

}