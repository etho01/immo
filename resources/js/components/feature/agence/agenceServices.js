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
    setElement,
    setElements,
    refreshErreur
} = useServices('agence');

export default function useAgence(){

    return {
        agence :element,
        agences: elements,
        getAgences: getElements,
        getAgence: getElement,
        updateAgence: updateElement,
        deleteAgence: deleteElement,
        createAgence: createElement,
        page,
        gotoPage,
        nbPage,
        erreurTab,
        setAgence: setElement,
        setAgences: setElements,
        refreshErreur
    }

}