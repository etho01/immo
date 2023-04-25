import foncConst from "./fonctConst";

const { getValueList } = foncConst();

export default function locataireConst(){

    const genreLoc = [
        {
            id: 'femme',
            nom: 'Femme'
        },
        {
            id: 'homme',
            nom: 'Homme'
        },
    ];

    const locataireCols = [
        {
            nom : 'Nom du locataire',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (locataire) => locataire.nom + " " + locataire.prenom,
                    },
                ],
            },
            size: 1,
            id: 'loc.nom'
        },
        {
            nom : 'Date de naissance du locataire',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (locataire) => locataire.date_naissance,
                    }
                ],
            },
            size: 1,
            id: 'loc.naissance'
        },
        {
            nom : 'Email du locataire',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (locataire) => locataire.email,
                    }
                ],
            },
            size: 1,
            id: 'loc.mail'
        },
        {
            nom : 'Telephone du locataire',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (locataire) => locataire.telephone,
                    }
                ],
            },
            size: 1,
            id: 'loc.tel'
        },
        {
            nom : 'Genre du locataire',
            param: {
                actions: [
                    {
                        type: 'fonc',
                        fonc: (locataire) =>  getValueList(locataire.genre, genreLoc)
                    }
                ]
            },
            size: 1,
            id: 'loc.genre'
        },
        {
            nom: '',
            btnNom: {
                event: {
                    nomEvent: 'newLocataire',
                },
                class: 'bg-gray-100 px-2 py-1 rounded-xl border-gray-200 border-2 cursor-pointer',
                icone: {
                    icone: ['fas', 'plus'],
                }
            },
            param: {
                class: 'flex justify-end',
                actions: [
                    {
                        type: 'button',
                        event: {
                            nomEvent: 'showLocataire',
                            data: (locataire) => locataire.id 
                        },
                        class: 'bg-gray-100 px-2 py-1 rounded-xl border-gray-200 border-2 cursor-pointer',
                        icone: {
                            icone: ['fas', 'arrow-up-right-from-square'],
                        }
                    }
                ]
            },
            size: 1,
            id: 'loc.button'
        }
    ];

    return {
        locataireCols,
        genreLoc
    }
}
