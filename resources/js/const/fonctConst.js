export default function foncConst(){

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
