const mysql = require('mysql')
const dotenv = require('dotenv')
const sha256 = require("js-sha256")
const jwt = require("jwt-then")
const sqlfile = require('../dbscript/sqlfile')

let instance = null
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    multipleStatements: true
});

try {
    connection.connect((err) => {
        if (err) {
            console.log("Please enter the correct information for your connection!");
        }
        else {
            connection.query(sqlfile['sqlfile'], (error, result) => {
                if (error) {
                    console.log("Database already exists!");
                } else {
                    console.log("Database successfully created!");
                }
            })
        }
    })
} catch (error) {
    console.log('something unexpected!');
}



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

    async getAllCategories() {

        const query1 = `SELECT DISTINCT brand_name FROM brands ORDER BY brand_name ASC;`;
        const query2 = `SELECT DISTINCT model_name FROM models ORDER BY model_name ASC `;
        const query3 = `SELECT DISTINCT model_year FROM models ORDER BY model_year DESC `;
        return await new Promise((resolve, reject) => {
            let allCategories = {};

            connection.query(query1, (err1, result1) => {
                if (result1.length !== 0 && !err1) {
                    connection.query(query2, (err2, result2) => {
                        if (result2.length !== 0 && !err2) {
                            connection.query(query3, (err3, result3) => {
                                if (result3.length !== 0 && !err3) {
                                    allCategories["brands"] = result1
                                    allCategories["models"] = result2
                                    allCategories["years"] = result3
                                    resolve(allCategories)
                                }
                                else
                                    reject('no item was found');
                            })
                        }
                        else
                            reject('no item was found');
                    })
                }
                else
                    reject('no item was found');
            })
        })
    }


    async getCategoryResult({ brand, model, year, category }) {
        const query1 = `SELECT brand_id,model_id,category_id from brands,models,categories 
                            WHERE brand_name=? AND model_name=? AND model_year=? AND category_name = ?;`
        const query2 = `SELECT DISTINCT product_name 
                            FROM products,brands,models,categories 
                            WHERE products.brand_id=? AND products.model_id=? AND products.category_id=? ORDER BY product_id DESC`;
        return await new Promise((resolve, reject) => {
            connection.query(query1, [brand, model, year, category], function (err1, result1) {
                if (result1.length !== 0 && !err1) {
                    connection.query(query2, [result1[0].brand_id, result1[0].model_id, result1[0].category_id], function (err2, result2) {
                        if (result2.length !== 0 && !err2)
                            resolve(result2)
                        else
                            reject('Nothing was found in that category!');
                    })
                }
                else
                    reject('Brand, Model, and Year didn\'t match!');
            })
        })
    }

}

module.exports = DbService;