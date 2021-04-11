const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const requestControllers = require("../controllers/requestControllers");
const auth = require("../middlewares/auth")

router.post("/", auth, catchErrors(requestControllers.addRequest));

module.exports = router;