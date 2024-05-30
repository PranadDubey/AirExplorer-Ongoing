const router = require("express").Router({ mergeParams: true })
const CoPassenger = require("../models/CoPassenger.class")
const { log } = require("console")
const { v4: uuidv4 } = require("uuid")

router.get("/", async (req, res) => {
  const { userID } = req.params
  log("get co-passengers invoked", userID)
  const found = await CoPassenger.find({})
  log("found", found)
  res.json(found)
})

router.get("/:copassengerID", async (req, res) => {
  const { copassengerID } = req.params
  log("get co-passengers invoked", copassengerID)
  const where = [["copassengerID", "=", `'${copassengerID}'`]]
  const found = await CoPassenger.find({ where }).catch((e) => e)
  log("found", found)
  res.json(found)
})

router.post("/", async (req, res) => {
  const data = req.body
  const { userID } = req.params
  data.coPassengerID = userID + "-" + Date.now()
  // data.coPassengerID = uuidv4();
  log("creating new co-passenger", data)
  const saved = await CoPassenger.save({ data }).catch((e) => e)
  log("saved", saved)
  res.json(saved)
})

router.put("/:copassengerID", async (req, res) => {
  const data = req.body
  const { copassengerID } = req.params
  console.log("update", copassengerID)
  const where = [["copassengerID", "=", `'${copassengerID}'`]]
  const updated = await CoPassenger.save({ data, where }).catch((e) => e)
  console.log("updated", updated)
  res.json(updated)
})

router.delete("/:copassengerID", async (req, res) => {
  const { copassengerID } = req.params
  console.log("delete user invoked", copassengerID)
  const where = [["copassengerID", "=", `'${copassengerID}'`]]
  const deleted = await CoPassenger.del({ where }).catch((e) => e)
  console.log("deleted", deleted)
  res.json(deleted)
})

module.exports = router
