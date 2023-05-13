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
    /*    {
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
        },*/
        {
            nom: '',
            btnNom: {
                event: {
                    nomEvent: 'newContrat',
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
                            nomEvent: 'showContrat',
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
            id: 'loc.button'
        }
    ];

    return {
        ContratCols,
    }
}
