const dbInstance = require('./dbservice')

exports.register = async (req, res) => {
    const { fname, lname, email, phone, password, location } = req.body;
    console.log(fname);
    const emailRegex = /@gmail.com|@yahoo.com|@auis.edu.krd|@hotmail.com|@live.com|outlook.com/;

    if (!emailRegex.test(email)) throw "Email is not supported from our domain.";
    if (password.length < 6) throw "Password must be atleast 6 characters long.";

    const db = dbInstance.getDbServiceInstance();
    await db.checkDuplicateEmail(email).catch(() => { throw "User with same email already exits." })


    await db.saveUser(fname, lname, email, phone, password, location).then(() => {
        res.json({
            message: "User [" + fname + "] registered successfully!",
        });
    }).catch(() => {
        throw "error couldn't be registered"
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const db = dbInstance.getDbServiceInstance();

    await db.authenticateLogin(email, password).then((token) => {
        res.json({
            message: "User logged in successfully!",
            token,
        })
    })
}