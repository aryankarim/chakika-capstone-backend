const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const discountControllers = require("../controllers/discountControllers");
const auth = require("../middlewares/auth")

router.get("/", auth, catchErrors(discountControllers.getDiscountItems));

module.exports = router;