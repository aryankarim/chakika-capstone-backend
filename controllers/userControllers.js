const dbInstance = require('./dbservice')
const jwt = require("jwt-then");

exports.register = async (req, res) => {
    const { fname, lname, email, phone, password, location } = req.body;

    const emailRegex = /@gmail.com|@yahoo.com|@auis.edu.krd|@hotmail.com|@live.com/;

    if (!emailRegex.test(email)) throw "Email is not supported from your domain.";
    if (password.length < 6) throw "Password must be atleast 6 characters long.";

    const db = dbInstance.getDbServiceInstance();
    await db.checkDuplicateEmail(email).catch(() => { throw "User with same email already exits." })


    await db.saveUser(fname, lname, email, phone, password, location).then(() => {
        res.json({
            message: "User [" + fname + "] registered successfully!",
        });
    }).catch(err => {
        throw "data couldnt be registered"
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password: sha256(password + process.env.SALT),
    });

    if (!user) throw "Email and Password did not match.";

    const token = await jwt.sign({ id: user.id }, process.env.SECRET);

    res.json({
        message: "User logged in successfully!",
        token,
    });
};