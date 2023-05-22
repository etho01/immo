const deleteUndefine = function (data) { // delete les elements undefine des objets
    let filtered = Object.entries(data).filter(([key, value]) => {
        return value != undefined
    })
    return (Object.fromEntries(filtered))
}

export {
    deleteUndefine
}