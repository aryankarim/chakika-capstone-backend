const mysql = require('mysql');
const dotenv = require('dotenv');
const sha256 = require('js-sha256');
const jwt = require('jwt-then');
const sqlfile = require('../dbscript/sqlfile2');

let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,

  multipleStatements: true,
});

function handleDisconnect() {
  try {
    connection.connect((err) => {
      if (err) {
        console.log(err);
        console.log(
          'Please enter the correct information for your DB connection or make sure you have your MySQL server running!'
        );
      } else {
        connection.query(sqlfile['sqlfile'], (error) => {
          if (error) {
            console.log('Databse already exists');
          } else {
            console.log('Database successfully created!');
          }
        });
      }
    });
  } catch (error) {
    console.log('something unexpected!');
    setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
  }

  connection.on('error', function (err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();
class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async saveUser(fname, lname, email, phone, password, location) {
    try {
      console.log(fname, lname, email, phone, password, location);
      const results = new Promise((resolve, reject) => {
        const query = `INSERT INTO users (fname,lname,email,phone,password,location_id)values(?,?,?,?,?,?)`;
        connection.query(
          query,
          [
            fname,
            lname,
            email,
            phone,
            sha256(password + process.env.SALT),
            location,
          ],
          function (err, result, fields) {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
      return results;
    } catch (error) {
      return Promise.reject('could not register');
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
          } else resolve();
        });
      });
      return results;
    } catch (error) {
      return Promise.reject(error); //sql error
    }
  }

  async authenticateLogin(email, password) {
    return await new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE email = ? `;
      connection.query(query, [email], async function (err, result) {
        if (result) reject('user was not found with that email');
        else {
          if (result[0].password !== sha256(password + process.env.SALT)) {
            reject('password did not match');
          } else {
            console.log('login is authenticated');
            const token = await jwt.sign(
              { id: result[0].user_id },
              process.env.SECRET,
              { expiresIn: '172800s' }
            );
            //console.log(token);
            resolve({
              token,
              name: result[0].fname + ' ' + result[0].lname,
              email: result[0].email,
            });
          }
        }
      });
    }).catch((error) => {
      return Promise.reject(error);
    });
  }

  async searchItem(item) {
    const query = `SELECT products.product_id, product_name, brand_name, model_name, model_year, image_url, store_name, stock_quantity, unit_price, COALESCE(discounts.discount_rate, 0) as discount_rate
                            FROM products
                            LEFT JOIN brands
                            ON products.brand_id = brands.brand_id
                            LEFT JOIN models
                            ON products.model_id=models.model_id
                            LEFT JOIN stocks
                            ON products.product_id = stocks.product_id
                            LEFT JOIN stores
                            ON stores.store_id = stocks.store_id
                            LEFT JOIN discounts
                            ON products.product_id = discounts.product_id
                            WHERE product_name LIKE ?;`;
    return await new Promise((resolve, reject) => {
      connection.query(query, ['%' + item + '%'], function (err, result) {
        if (result.length !== 0 && !err) resolve(result);
        else reject('no item was found');
      });
    }).catch((error) => {
      console.log(error);
      return Promise.reject('server error');
    });
  }

  async createRequest(id, { name, phone, subject, message }) {
    const query = `INSERT INTO requests ( name, request_phone, subject, message, user_id)
                       VALUES (?, ?, ?, ?, ?);`;
    return await new Promise((resolve, reject) => {
      connection.query(
        query,
        [name, phone, subject, message, id],
        function (err, result) {
          if (err) reject(err);
          resolve(result);
        }
      );
    }).catch((error) => {
      console.log(error);
      return Promise.reject('server error');
    });
  }

  async getAllCategories() {
    const query1 = `SELECT DISTINCT brand_id, brand_name FROM brands ORDER BY brand_name ASC;`;
    const query2 = `SELECT DISTINCT model_id, model_name FROM models ORDER BY model_name ASC `;
    const query3 = `SELECT DISTINCT model_year FROM models ORDER BY model_year DESC `;
    return await new Promise((resolve, reject) => {
      let allCategories = {};

      connection.query(query1, (err1, result1) => {
        if (result1.length !== 0 && !err1) {
          connection.query(query2, (err2, result2) => {
            if (result2.length !== 0 && !err2) {
              connection.query(query3, (err3, result3) => {
                if (result3.length !== 0 && !err3) {
                  allCategories['brands'] = result1;
                  allCategories['models'] = result2;
                  allCategories['years'] = result3;
                  resolve(allCategories);
                } else reject('no item was found');
              });
            } else reject('no item was found');
          });
        } else reject('no item was found');
      });
    }).catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
  }

  async getCategoryResult({ brand, model, year, category }) {
    const query1 = `SELECT brand_id,model_id,category_id from brands,models,categories
                            WHERE brand_name=? AND model_name=? AND model_year=? AND category_name = ?;`;
    const query2 = `SELECT  products.product_id, product_name, store_name, brand_name, model_name, model_year, stock_quantity, unit_price, COALESCE(discounts.discount_rate, 0) as discount_rate
                            FROM products
                            LEFT JOIN brands
                            ON products.brand_id = brands.brand_id
                            LEFT JOIN models
                            ON products.model_id= models.model_id
                            LEFT JOIN stocks
                            ON products.product_id = stocks.product_id
                            LEFT JOIN stores
                            ON stores.store_id = stocks.store_id
                            LEFT JOIN discounts
                            ON products.product_id = discounts.product_id
                            WHERE products.brand_id=? AND products.model_id=? AND products.category_id=?;`;
    return await new Promise((resolve, reject) => {
      connection.query(
        query1,
        [brand.split('@#')[1], model.split('@#')[1], year, category],
        function (err1, result1) {
          if (result1.length !== 0 && !err1) {
            connection.query(
              query2,
              [
                result1[0].brand_id,
                result1[0].model_id,
                result1[0].category_id,
              ],
              function (err2, result2) {
                if (result2.length !== 0 && !err2) resolve(result2);
                else reject('Nothing was found in that category!');
              }
            );
          } else reject("Brand, Model, and Year didn't match!");
        }
      );
    }).catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
  }

  async saveCar(userID, { brand, model }) {
    const query = `INSERT INTO garage_cars (user_id, model_id, brand_id)VALUES(?, ?, ?);`;
    return await new Promise((resolve, reject) => {
      connection.query(
        query,
        [userID, model.split('@#')[0], brand.split('@#')[0]],
        function (err, result) {
          if (err) reject(err);
          resolve(result);
        }
      );
    }).catch(() => {
      return Promise.reject('Please select a valid car');
    });
  }

  async removeCar(userID, { brand, model }) {
    const query = `DELETE FROM garage_cars WHERE user_id = ? AND model_id = ? AND brand_id= ?;`;
    console.log(userID, model.split('@#')[0], brand.split('@#')[0]);
    return await new Promise((resolve, reject) => {
      connection.query(
        query,
        [userID, model.split('@#')[0], brand.split('@#')[0]],
        function (err, result) {
          if (err) reject(err);
          resolve(result);
        }
      );
    }).catch(() => {
      return Promise.reject('Please select a valid car');
    });
  }

  async garageCars(userID) {
    console.log(userID);
    const query = `SELECT user_id, garage_cars.brand_id, garage_cars.model_id,brand_name,model_name,model_year FROM garage_cars
                                JOIN  brands on brands.brand_id= garage_cars.brand_id
                                JOIN models on models.model_id = garage_cars.model_id
                                WHERE user_id = ?;`;
    return await new Promise((resolve, reject) => {
      connection.query(query, [userID], function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    }).catch(() => {
      return Promise.reject('could not get garage cars from the sql');
    });
  }

  async addOrderItem(id, { productId, productPrice }) {
    const query1 = `INSERT INTO  orders
                            (order_id, user_id, status, order_date) VALUES (0 ,? , 0, ?);`;
    const query2 = `INSERT INTO order_items
                            (order_id, product_id, quantity, price) VALUES (?, ? , 1 , ?);`;

    return await this.prevOrder(id)
      .then(async (resultArray) => {
        return await new Promise((resolve, reject) => {
          if (resultArray.length > 0) {
            connection.query(
              query2,
              [resultArray[0].order_id, productId, productPrice],
              function (err, result) {
                if (err) reject(err);
                resolve('item succesfully added');
              }
            );
          } else {
            connection.query(
              query1,
              [
                id,
                new Date().getFullYear() +
                  '-' +
                  new Date().getDate() +
                  '-' +
                  new Date().getDay(),
              ],
              function (err1, result1) {
                if (err1) reject(err1);
                console.log(result1.insertId);
                connection.query(
                  query2,
                  [result1.insertId, productId, productPrice],
                  function (err2, result2) {
                    if (err2) reject(err2);
                    resolve('item succesfully added');
                  }
                );
              }
            );
          }

          console.log(resultArray);
        });
      })
      .catch((err) => {
        return Promise.reject('error in addorderitem', err);
      });
  }

  async prevOrder(id) {
    const query = `SELECT order_id, status FROM orders WHERE user_id = ? AND status = 0;`;
    return await new Promise((resolve, reject) => {
      connection.query(query, [id], function (err, result) {
        console.log('in prevOrder', result);
        if (err) reject(err);
        resolve(result);
      });
    }).catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
  }
  async getCartItems(id) {
    const query = `SELECT order_items.product_id,product_name, price, quantity
                            FROM order_items
                            LEFT JOIN products
                            ON products.product_id=order_items.product_id
                            WHERE order_id = (SELECT order_id FROM orders WHERE user_id=? and status=0);`;
    return await new Promise((resolve, reject) => {
      connection.query(query, [id], function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    }).catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
  }

  async removeOrderItem(userID, { product_id }) {
    const query = `DELETE FROM order_items WHERE product_id =?  AND order_id = (SELECT order_id FROM orders WHERE user_id=? and status=0)`;
    return await new Promise((resolve, reject) => {
      connection.query(query, [product_id, userID], function (err, result) {
        console.log(result);
        if (err) reject(err);
        resolve('order deleted successfully');
      });
    }).catch(() => {
      return Promise.reject('err deleting');
    });
  }

  async removeAll(userID) {
    const query = `DELETE FROM order_items WHERE order_id = (SELECT order_id FROM orders WHERE user_id=? and status=0)`;
    return await new Promise((resolve, reject) => {
      connection.query(query, [userID], function (err, result) {
        console.log(result);
        if (err) reject(err);
        resolve('orders deleted successfully');
      });
    }).catch(() => {
      return Promise.reject('err deleting');
    });
  }

  async getDiscountProducts() {
    const query = `SELECT discounts.product_id,product_name, discount_rate, expire_date , stock_quantity, unit_price,brands.brand_name,model_name,model_year,store_name FROM discounts
                            LEFT JOIN products
                            ON products.product_id = discounts.product_id
                            LEFT JOIN stocks
                            ON products.product_id = stocks.product_id
                            LEFT JOIN brands
                            ON products.brand_id = brands.brand_id
                            LEFT JOIN models
                            ON products.model_id = models.model_id
                            LEFT JOIN stores
                            ON stores.store_id = stocks.store_id
                            ORDER BY RAND()
                            LIMIT 3;`;
    return await new Promise((resolve, reject) => {
      connection.query(query, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    }).catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
  }
}

module.exports = DbService;
