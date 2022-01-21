const router = (module.exports = require("express").Router());
const { createReadlog, updateReadlog, deleteReadlog, getReadlog, getReadlogs } = require("../controller/readlog");
const fileUpload = require("express-fileupload");

router.post("/", fileUpload(), createReadlog);

router.put("/:id", fileUpload(), updateReadlog);

router.delete("/:id", deleteReadlog);

router.get("/:id", getReadlog);

router.get("/", getReadlogs);