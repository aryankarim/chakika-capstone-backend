const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const categoryControllers = require("../controllers/categoryControllers");
const auth = require("../middlewares/auth")

router.get("/categories", auth, catchErrors(categoryControllers.getCategories));
router.get("/results", auth, catchErrors(categoryControllers.getResults));
router.get("/garagecars", auth, catchErrors(categoryControllers.getGarageCars));
router.put("/save", auth, catchErrors(categoryControllers.saveToGarage));
router.delete("/delete", auth, catchErrors(categoryControllers.removeFromGarage));


module.exports = router;