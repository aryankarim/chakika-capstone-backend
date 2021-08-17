const dbInstance = require('./dbservice');

exports.getDiscountItems = async (req, res) => {

    const db = dbInstance.getDbServiceInstance();
    await db.getDiscountProducts().then((result) => {
        res.json({ message: result });
    }).catch(() => {
        throw "no discount product were found"
    })
};