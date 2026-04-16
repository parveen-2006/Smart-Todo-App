const expresss = require("express");
const router = expresss.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Success",
  });
});

router.post("/", (req, res) => {
  res.status(201).json({
    success: true,
    message: "Success",
  });
});

module.exports = router;
