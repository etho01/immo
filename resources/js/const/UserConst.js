export default function userConst() {
    const userCols = [
        {
            nom : 'Nom',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (user) => user.name,
                    },
                ],
            },
            size: 1,
            id: 'user.nom'
        },
        {
            nom : 'Email',
            param: {
                actions : [
                    {
                        type: 'fonc',
                        fonc: (user) => user.email,
                    },
                ],
            },
            size: 1,
            id: 'user.email'
        },
        {
            nom: '',
            btnNom: {
                event: {
                    nomEvent: 'newUser',
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
                            nomEvent: 'showUser',
                            data: (proprietaire) => proprietaire.id 
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
    ]

    return {
        userCols
    }
}