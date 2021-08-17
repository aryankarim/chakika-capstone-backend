const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const cartControllers = require("../controllers/cartControllers");
const auth = require("../middlewares/auth")


router.post("/add", auth, catchErrors(cartControllers.addItem));
router.get("/allItems", auth, catchErrors(cartControllers.getItems));
router.delete("/remove", auth, catchErrors(cartControllers.removeOrderItem));
router.delete("/removeAll", auth, catchErrors(cartControllers.removeAllItems));




module.exports = router;