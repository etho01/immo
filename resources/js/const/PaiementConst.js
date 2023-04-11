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

    return {
        paiementCols,
    }
}
