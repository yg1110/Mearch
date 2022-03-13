const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("", controller.getSearch);
router.post("", controller.getTagSearch);
router.post("/category", controller.getCategorySearch);

module.exports = router;
