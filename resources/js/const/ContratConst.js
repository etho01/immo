export default function contratConst(){

    const ContratCols = [
        {
            nom : 'Nom du locataire',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (contrat) => contrat.locataire.nom + " " + contrat.locataire.prenom,
                    },
                ],
            },
            size: 1,
            id: 'loc.nom'
        },
        {
            nom : 'Adresse du bien',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (contrat) => contrat.appart.adresse,
                    }
                ],
            },
            size: 1,
            id: 'appart.adresse'
        },
        {
            nom : 'Loyer du bien',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (contrat) => contrat.appart.loyer + " €",
                    }
                ],
            },
            size: 1,
            id: 'appart.loyer'
        },
        {
            nom : 'Charge du bien',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (contrat) => contrat.appart.charge + " €",
                    }
                ],
            },
            size: 1,
            id: 'appart.charge'
        },
        {
            nom : 'Charge du bien',
            param: {
                actions : [
                    {
                        type: 'button',
                        event: 'd',
                    }
                ],
            },
            size: 1,
            id: 'contrat.button'
        },
    ];

    return {
        ContratCols,
    }
}
