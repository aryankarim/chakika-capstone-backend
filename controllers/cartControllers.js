const dbInstance = require('./dbservice');

exports.addItem = async (req, res) => {

    const db = dbInstance.getDbServiceInstance();
    await db.addOrderItem(req.payload.id, req.body).then(() => {
        res.json({ message: "item successfully added" });
    }).catch(() => {
        throw "failed to add"
    })
};