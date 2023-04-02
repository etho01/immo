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
    ];

    return {
        etatDesLieuCols,
    }
}
