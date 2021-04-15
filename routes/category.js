const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const categoryControllers = require("../controllers/categoryControllers");
const auth = require("../middlewares/auth")

router.get("/categories", auth, catchErrors(categoryControllers.getCategories));
router.get("/results", auth, catchErrors(categoryControllers.getResults));

module.exports = router;