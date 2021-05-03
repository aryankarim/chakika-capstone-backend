const dbInstance = require('./dbservice');

exports.getCategories = async (req, res) => {

    const db = dbInstance.getDbServiceInstance();
    await db.getAllCategories(req.body).then((resultArray) => {
        res.json({ message: resultArray });
    })
};

exports.getResults = async (req, res) => {

    const db = dbInstance.getDbServiceInstance();
    if (!req.query.brand || !req.query.model || !req.query.year) {
        throw "Fields cannot be empty!"
    }
    if (!req.query.category) {
        throw "Please select a category!"
    }

    await db.getCategoryResult(req.query).then((resultArray) => {
        res.json({ message: resultArray });
    })
};

exports.saveToGarage = async (req, res) => {
    console.log("in savetogarage", req.body);
    const db = dbInstance.getDbServiceInstance();
    await db.saveCar(req.payload.id, req.body).then((resultArray) => {
        res.json({ message: resultArray });
    })
};

exports.removeFromGarage = async (req, res) => {
    console.log("in removefromgarage", req.body);
    const db = dbInstance.getDbServiceInstance();
    await db.removeCar(req.payload.id, req.body).then((resultArray) => {
        res.json({ message: resultArray });
    })
};


exports.getGarageCars = async (req, res) => {
    const db = dbInstance.getDbServiceInstance();
    await db.garageCars(req.payload.id).then((resultArray) => {
        res.json({ message: resultArray });
    })
};