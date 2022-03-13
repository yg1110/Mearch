const { Router } = require("express");
const { join } = require("path");
const { readdirSync, statSync } = require("fs");
const { createResponse } = require("../utils/response");

const router = Router();

const r = Router();
const baseDir = __dirname;

readdirSync(baseDir)
  .filter((dir) => statSync(join(baseDir, dir)).isDirectory())
  .forEach((dir) => {
    r.use(`/${dir}`, require(join(baseDir, dir)));
  });

router.use(`/`, r);
router.get("*", (req, res, next) => {
  res.json(createResponse(res, { message: "404 Not found Error" }, 404));
});

module.exports = router;
