const noAuthResponse = (res) => {
    res.status(403)
    res.send({ result: 'error', error: 'You need to be authentified to use the API'})
}

module.exports = noAuthResponse