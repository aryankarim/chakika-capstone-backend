const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const cartControllers = require("../controllers/cartControllers");
const auth = require("../middlewares/auth")


router.post("/add", auth, catchErrors(cartControllers.addItem));


module.exports = router;