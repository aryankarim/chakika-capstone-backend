const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const userControllers = require("../controllers/userControllers");


router.post("/login", catchErrors(userControllers.login));

router.post("/register", catchErrors(userControllers.register));


module.exports = router;