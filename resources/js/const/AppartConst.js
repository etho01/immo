export default function appartConst(){

    const appartCols = [
        {
            nom : 'Adresse de l\'appart',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (appart) => appart.adresse,
                    },
                ],
            },
            size: 1,
            id: 'appart.adresse'
        },
        {
            nom : 'Code postal de l\'appart',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (appart) => appart.cp,
                    }
                ],
            },
            size: 1,
            id: 'appart.cp'
        },
        {
            nom : 'Pays de l\'appart',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (appart) => appart.pays,
                    }
                ],
            },
            size: 1,
            id: 'appart.pays'
        },
        {
            nom : 'Charge de l\'appart',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (appart) => appart.charge + " €"
                    }
                ],
            },
            size: 1,
            id: 'appart.charge'
        },
        {
            nom : 'Loyer de l\'appart',
            param: {
                actions: [
                    {
                        type: 'fonc',
                        fonc: (appart) => appart.loyer + " €"
                    }
                ]
            },
            size: 1,
            id: 'appart.loyer'
        },
        {
            nom : 'Agence de l\'appart',
            param: {
                actions: [
                    {
                        type: 'fonc',
                        fonc: (appart) => appart.agence.nom
                    }
                ]
            },
            size: 1,
            id: 'appart.agence'
        }
    ];

    return {
        appartCols,
    }
}
