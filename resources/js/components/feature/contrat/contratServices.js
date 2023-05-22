// get les services principaux 
import  useServices from '../../../services/baseServices.js'

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
} = useServices('contrat');

export default function userContrat(){


    return {
        contrat: element,
        contrats: elements,
        getContrat: getElement,
        getContrats: getElements,
        updateContrat: updateElement,
        deleteContrat: deleteElement,
        createContrat: createElement,
        page,
        gotoPage,
        nbPage,
        erreurTab,
        setContrat: setElement,
        setContrats: setElements,
        refreshErreur
    }

}