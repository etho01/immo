export default function contratConst(){
    // colonne de la lise des contrats
    const ContratCols = [
        {
            nom : "Reference du contrat", // com de la colonne
            param: { 
                actions: [ // liste des action de la colone
                    {
                        type: 'fonc', // type
                        fonc: (contrat) => contrat.ref // fonction de renvoe
                    }
                ]
            },
            size: 1, // taille de la colline
            id: 'contrat.ref' // di de la colone 
        },
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
            nom: '',
            btnNom: { // infos boutton thead
                event: {
                    nomEvent: 'newContrat', // non de l'event
                },
                class: 'bg-gray-100 px-2 py-1 rounded-xl border-gray-200 border-2 cursor-pointer',// classe du boutton
                icone: {// icone du boutton
                    icone: ['fas', 'plus'],
                }
            },
            param: {
                class: 'flex justify-end',
                actions: [
                    {
                        type: 'button',
                        event: { // descprion de l'emit d'appuie sur le boutton
                            nomEvent: 'showContrat',
                            data: (contrat) => contrat.id 
                        },
                        class: 'bg-gray-100 px-2 py-1 rounded-xl border-gray-200 border-2 cursor-pointer', // classe du boutton
                        icone: { // icone du boutton
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
