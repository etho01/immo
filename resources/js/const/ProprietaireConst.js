import foncConst from "./fonctConst";

const { getValueList } = foncConst();

export default function proprietaireConst(){

    const genreProprio = [
        {
            id: 'femme',
            nom: 'Femme'
        },
        {
            id: 'homme',
            nom: 'Homme'
        },
    ];

    const proprioCols = [
        {
            nom : 'Nom du proprietaire',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (proprietaire) => proprietaire.nom + " " + proprietaire.prenom,
                    },
                ],
            },
            size: 1,
            id: 'loc.nom'
        },
        {
            nom : 'Date de naissance du proprietaire',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (proprietaire) => proprietaire.date_naissance,
                    }
                ],
            },
            size: 1,
            id: 'loc.naissance'
        },
        {
            nom : 'Email du proprietaire',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (proprietaire) => proprietaire.email,
                    }
                ],
            },
            size: 1,
            id: 'loc.mail'
        },
        {
            nom : 'Télèphone du proprietaire',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (proprietaire) => proprietaire.telephone,
                    }
                ],
            },
            size: 1,
            id: 'loc.tel'
        },
        {
            nom : 'Genre du proprietaire',
            param: {
                actions: [
                    {
                        type: 'fonc',
                        fonc: (proprietaire) =>  getValueList(proprietaire.genre, genreProprio)
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
                    nomEvent: 'newProprietaire',
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
                            nomEvent: 'showProprietaire',
                            data: (proprietaire) => proprietaire.id 
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
        proprioCols,
        genreProprio
    }
}
