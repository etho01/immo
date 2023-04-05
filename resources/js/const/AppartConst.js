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
            size: 2,
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
        },
        {
            nom: '',
            param: {
                class: 'flex justify-end',
                actions: [
                    {
                        type: 'button',
                        event: {
                            nomEvent: 'showAppart',
                            data: (appart) => appart.id 
                        },
                        class: 'bg-gray-100 px-2 py-1 rounded-xl border-gray-200 border-2 cursor-pointer',
                        icone: {
                            icone: ['fas', 'arrow-up-right-from-square'],
                        }
                    }
                ]
            },
            size: 1,
            id: 'apprt.button'
        }
    ];

    return {
        appartCols,
    }
}
