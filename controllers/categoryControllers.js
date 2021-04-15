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