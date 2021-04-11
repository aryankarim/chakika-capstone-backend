const mysql = require('mysql')
const dotenv = require('dotenv')
const sha256 = require("js-sha256")
const jwt = require("jwt-then");

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
            console.log(fname, lname, email, phone, password, location);
            const results = new Promise((resolve, reject) => {
                const query = `INSERT INTO users (fname,lname,email,phone,password,location_id)values(?,?,?,?,?,?)`
                connection.query(query, [fname, lname, email, phone, sha256(password + process.env.SALT), location], function (err, result, fields) {
                    if (err) reject(err);
                    resolve(result)
                })
            })
            return results;
        } catch (error) {
            return Promise.reject(error)
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
                    } else
                        resolve()
                })
            })
            return results;
        } catch (error) {
            return Promise.reject(error) //sql error
        }
    }

    async authenticateLogin(email, password) {
        return await new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE email = ? `;
            connection.query(query, [email], async function (err, result) {
                if (result.length === 0)
                    reject("user was not found with that email")
                else {
                    if (result[0].password !== sha256(password + process.env.SALT)) {
                        reject("password did not match")
                    } else {
                        console.log("login is authenticated");
                        const token = await jwt.sign({ id: result[0].user_id }, process.env.SECRET, { expiresIn: '172800s' });
                        //console.log(token);
                        resolve({ token, name: result[0].fname + " " + result[0].lname, email: result[0].email })
                    }
                }
            })
        })
    }

    async searchItem(item) {
        const query = `SELECT product_name, brand_name, model_name, model_year, image_url 
                                    FROM products  
                                    LEFT JOIN brands 
                                    ON products.brand_id = brands.brand_id 
                                    LEFT JOIN models 
                                    on products.model_id=models.model_id WHERE product_name LIKE ?;`;
        return await new Promise((resolve, reject) => {
            connection.query(query, ['%' + item + '%'], function (err, result) {
                if (result.length !== 0 && !err)
                    resolve(result)
                else
                    reject('no item was found');
            })
        })
    }

    async createRequest({ email, name, phone, subject, message }) {

        return await this.getUserId(email).then(async (userID) => {

            const query = `INSERT INTO requests ( name, request_phone, subject, message, user_id)
                       VALUES (?, ?, ?, ?, ?);`
            return await new Promise((resolve, reject) => {
                connection.query(query, [name, phone, subject, message, userID], function (err, result) {
                    if (err) reject(err);
                    resolve(result)
                })
            })

        }).catch(() => {
            return Promise.reject(error)
        })

    }

    async getUserId(email) {
        const query = await new Promise((resolve, reject) => {
            connection.query("SELECT user_id FROM users where email = ?", [email], function (err, result) {
                if (err) reject(err);
                resolve(result[0].user_id)
            })
        })
        return query;

    }





}

module.exports = DbService;