export default function etatDesLieuConst(){

    const etatDesLieuCols = [
        {
            nom : 'Date de l\'etat des lieux',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (etatDesLieu) => etatDesLieu.date,
                    },
                ],
            },
            size: 1,
            id: 'etatDesLieu.date'
        },
        {
            nom : 'Commentaire',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (etatDesLieu) => etatDesLieu.commentaire,
                    }
                ],
            },
            size: 1,
            id: 'etatDesLieu.com'
        },
        {
            nom : 'Stade',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (etatDesLieu) => etatDesLieu.stade,
                    }
                ],
            },
            size: 1,
            id: 'etatDesLieu.stade'
        },
        {
            nom: '',
            param: {
                class: 'flex justify-end',
                actions: [
                    {
                        type: 'button',
                        event: {
                            nomEvent: 'showEtaDesLieu',
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
        etatDesLieuCols,
    }
}
