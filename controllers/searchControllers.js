const dbInstance = require('./dbservice');

exports.searchItem = async (req, res) => {

    const db = dbInstance.getDbServiceInstance();

    await db.searchItem(req.body.search).then((result) => {
        res.json(result);
    }).catch((err) => {
        throw err
    })
};