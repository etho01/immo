export default function paiementConst(){

    const paiementCols = [
        {
            nom : 'Date du paiement',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (paiement) => paiement.date_paiement,
                    },
                ],
            },
            size: 1,
            id: 'paiement.date'
        },
        {
            nom : 'Montant du paiement',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (paiement) => paiement.montant_paiement +  " €",
                    }
                ],
            },
            size: 1,
            id: 'loc.naissance'
        },
        {
            nom: '',
            btnNom: {
                event: {
                    nomEvent: 'createPaiement',
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
                            nomEvent: 'showPaiement',
                            data: (etatDesLieu) => etatDesLieu 
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

    const originePaiement = [
        {
            id: 1,
            nom: "Virement bancaire"
        },
        {
            id: 2,
            nom: "Virement bancaire automatique"
        },
        {
            id: 3,
            nom: "Virement par cheque"
        },
        {
            id: 4,
            nom: "Virement par espece"
        },
    ];

    return {
        paiementCols,
        originePaiement
    }
}
