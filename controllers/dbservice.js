const mysql = require('mysql')
const dotenv = require('dotenv')
const sha256 = require("js-sha256")
let instance = null
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
});

connection.connect((err) => {
    if (err)
        console.log("db connection error:", err)
    else
        console.log("db connect success")
})

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async saveUser(fname, lname, email, phone, password, location) {
        try {
            const results = new Promise((resolve, reject) => {
                const query = `INSERT INTO users (fname,lname,email,phone,password,location_id)values(?,?,?,?,?,?)`
                console.log(sha256(password + process.env.SALT));
                connection.query(query, [fname, lname, email, phone, sha256(password + process.env.SALT), location], function (err, result, fields) {
                    if (err) reject(err);
                    resolve(result)
                })
            })
            return results;
        } catch (error) {
            console.log("SQL user insert error: ", error);
        }
    }

    async checkDuplicateEmail(email) {

        try {
            const results = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM users WHERE email = ? `;
                connection.query(query, [email], function (err, result) {
                    if (result.length != 0) {
                        console.log(result);
                        reject(err);
                    }
                    resolve()
                })
            })
            return results;
        } catch (error) {
            return new Promise().reject()
        }

    }

}

module.exports = DbService;