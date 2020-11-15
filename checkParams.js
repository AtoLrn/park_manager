const checkParams = (params, body) => {
    const bodyParamsName = Object.keys(body)
    const missingParams = params.reduce((acc, param) => {
        const finded = bodyParamsName.find(bodyParam => param === bodyParam)
        if (!finded) {
            acc.push(param)
        }
        return acc
    }, [])

    return missingParams
}

const missingParams = (res, params) => {
    res.status(400)
    return res.send({ result: 'missing parameter(s)', error: 'Missing following parameter(s) => ' + params.join(' ')})
}



module.exports = { checkParams, missingParams }