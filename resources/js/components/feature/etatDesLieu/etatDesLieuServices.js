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
} = useServices('etatDesLieux');

export default function useEtatDesLieu(){

    return {
        etatDesLieu :element,
        etatDesLieus: elements,
        getEtatDesLieus: getElements,
        getEtatDesLieu: getElement,
        createEtatDesLieu: createElement,
        deleteEtatDesLieu: deleteElement,
        updateEtatDesLieu: updateElement,
        page,
        gotoPage,
        nbPage,
        erreurTab,
        refreshErreur,
        setEtatDesLieu: setElement,
        setEtatDesLieus: setElements,
        refreshErreur
    }

}