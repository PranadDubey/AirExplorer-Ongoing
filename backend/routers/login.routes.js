const router = require("express").Router();
const User = require("../models/User.class");
const { log } = require("console");
const jwt = require("jsonwebtoken");
const { jwtToken } = process.env;

router.post("/", async (req, res) => {
  const { loginID, password } = req.body;

  console.log("save user request received!", loginID, password);

  const where = [["email", "=", `'${loginID}'`]];
  const select = "userID, firstName,lastName,phone, email, password,gender";

  const found = await User.find({ select, where }).catch((e) => e);

  log("user found", found);
  if (!found.success) return res.json(found);
  if (found.result.length == 0)
    return res.json({ success: false, error: "Invalid LoginID!" });
  if (found.result[0].password != password)
    return res.json({ success: false, error: "Invalid Password!" });
  // res.json(found);
  const { password: pass, status, ...user } = found.result[0];
  user.iat = Date.now();
  const token = jwt.sign(user, jwtToken, {
    expiresIn: "1h",
  });

  res.json({ success: true, token, user });
});

router.get("/", async (req, res) => {
  const authToken = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(authToken, jwtToken);
  const where = [["loginID", "=", loginID]];
  const found = await User.find({ where }).catch((e) => e);
  console.log(found);
});

module.exports = router;
