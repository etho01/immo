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
    ];

    return {
        paiementCols,
    }
}
