export default function locataireConst(){

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
                        fonc: (locataire) => locataire.genre
                    }
                ]
            },
            size: 1,
            id: 'loc.genre'
        }
    ];

    return {
        locataireCols,
    }
}
