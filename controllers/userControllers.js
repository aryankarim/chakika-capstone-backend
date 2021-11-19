const dbInstance = require('./dbservice');

exports.register = async (req, res) => {
  try {
    const { fname, lname, email, phone, password, repeatpassword, location } =
      req.body;
    console.log(email.length);
    if (
      fname.length < 1 ||
      lname.length < 1 ||
      email.length < 1 ||
      phone.length < 1
    )
      throw 'please fill all the required information';

    const emailRegex =
      /@gmail.com|@yahoo.com|@auis.edu.krd|@hotmail.com|@live.com|outlook.com/;

    if (!emailRegex.test(email))
      throw 'Email is not supported from our domain!';
    if (password.length < 6)
      throw 'Password must be atleast 6 characters long!';
    if (password !== repeatpassword) throw 'passowords did not match!';

    const db = dbInstance.getDbServiceInstance();
    await db.checkDuplicateEmail(email).catch(() => {
      throw 'User with same email already exits.';
    });

    await db
      .saveUser(fname, lname, email, phone, password, location)
      .then(() => {
        res.json({
          message: 'User [' + fname + '] registered successfully!',
        });
      })
      .catch(() => {
        throw "error couldn't be registered";
      });
  } catch (error) {
    console.log('ERROR INSIDE REGISTER: ', error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email.length < 1 || password.length < 1)
      throw 'please fill all the required information';

    const db = dbInstance.getDbServiceInstance();

    await db
      .authenticateLogin(email, password)
      .then(({ token, name, email }) => {
        console.log(name, email);
        res.json({
          message: 'User logged in successfully!',
          name,
          email,
          token,
        });
      })
      .catch((errMsg) => {
        throw errMsg;
      });
  } catch (error) {
    throw 'Could not login!';
  }
};
