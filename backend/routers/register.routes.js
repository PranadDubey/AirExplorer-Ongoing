const router = require("express").Router();
const User = require("../models/User.class");

router.post("/", async (req, res) => {
  const data = req.body;
  const saved = await User.save({ data }).catch((e) => console.log(e));
  res.json(saved);
});

module.exports = router;
