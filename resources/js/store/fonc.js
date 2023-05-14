const deleteUndefine = function (data) {
    let filtered = Object.entries(data).filter(([key, value]) => {
        return value != undefined
    })
    return (Object.fromEntries(filtered))
}

export {
    deleteUndefine
}