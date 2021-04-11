const dbInstance = require('./dbservice');

exports.addRequest = async (req, res) => {

    const db = dbInstance.getDbServiceInstance();
    console.log(req.body);
    console.log("in addrequest");
    await db.createRequest(req.body).then(() => {
        res.json({ message: "request successfully submitted" });
    }).catch(() => {
        throw "fields cannot be empty"
    })
};