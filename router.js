module.exports = app => {
    app.get('/', (req, res, next) => {
        res.send(['element1', 'element2', 'element3'])
    })
}