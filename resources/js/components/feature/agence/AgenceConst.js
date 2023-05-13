export default function agenceConst() {

    const agenceCol = [
        {
            nom: "Nom de l'agence",
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (agence) => agence.nom,
                    },
                ],
            },
            size: 3,
            id: 'agence.nom'
        },
        {
            nom: '',
            btnNom: {
                event: {
                    nomEvent: 'newAgence',
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
                            nomEvent: 'showAgence',
                            data: (contrat) => contrat.id 
                        },
                        class: 'bg-gray-100 px-2 py-1 rounded-xl border-gray-200 border-2 cursor-pointer',
                        icone: {
                            icone: ['fas', 'arrow-up-right-from-square'],
                        }
                    }
                ]
            },
            size: 1,
            id: 'agence.button'
        }
    ]

    return {
        agenceCol
    }

}