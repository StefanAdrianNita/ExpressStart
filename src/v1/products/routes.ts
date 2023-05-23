const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.allProducts);

module.exports = router;
