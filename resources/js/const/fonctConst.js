export default function foncConst(){

    // permet de de retrouver la value d'unr clée dans une liste d'element
    const getValueList = (value , tab) =>{
        let nom = '---';
        tab.forEach(element => {
            if (element.id == value){
                nom = element.nom
            }
        });

        return nom;
    }

    return {
        getValueList
    }

}
