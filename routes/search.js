const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const searchControllers = require("../controllers/searchControllers");
const auth = require("../middlewares/auth")

router.get("/", auth, catchErrors(searchControllers.searchItem));




module.exports = router;