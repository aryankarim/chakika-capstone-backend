const dbInstance = require('./dbservice');

exports.addItem = async (req, res) => {

    const db = dbInstance.getDbServiceInstance();
    await db.addOrderItem(req.payload.id, req.body).then((result) => {
        res.json({ message: result });
    }).catch(() => {
        throw "failed to add"
    })
};

exports.getItems = async (req, res) => {

    const db = dbInstance.getDbServiceInstance();
    await db.getCartItems(req.payload.id).then((result) => {
        res.json({ message: result });
    }).catch(() => {
        throw "failed retriving"
    })
};

exports.removeOrderItem = async (req, res) => {

    const db = dbInstance.getDbServiceInstance();
    await db.removeOrderItem(req.payload.id, req.body).then((result) => {
        res.json({ message: result });
    }).catch((error) => {
        throw error
    })
};

exports.removeAllItems = async (req, res) => {

    const db = dbInstance.getDbServiceInstance();
    await db.removeAll(req.payload.id).then(() => {
        res.json({ message: "all orders were removed" });
    }).catch((error) => {
        throw error
    })
};