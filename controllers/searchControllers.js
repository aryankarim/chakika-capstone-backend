const dbInstance = require('./dbservice');

exports.searchItem = async (req, res) => {

    const db = dbInstance.getDbServiceInstance();
    console.log(req.query);
    await db.searchItem(req.query.search).then((result) => {
        res.json(result);
    }).catch((err) => {
        throw err
    })
};