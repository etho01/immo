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
} = useServices('proprietaire');

export default function useProprietaire(){

    return {
        proprietaire: element,
        proprietaires: elements,
        getProprietaires: getElements,
        getProprietaire: getElement,
        updateProprietaire: updateElement,
        deleteProprietaire: deleteElement,
        createProprietaire: createElement,
        page,
        gotoPage,
        nbPage,
        erreurTab,
        setProprietaire: setElement,
        setProprietaires: setElements,
        refreshErreur
    }

}