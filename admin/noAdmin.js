const notAdmin = (res) => {
    res.status(403)
    res.send({ result: 'error', error: 'You need to be authentified and Admin to use the API'})
}

module.exports = notAdmin