const router = require("express").Router()

const coPassengerRoutes = require("./co-passenger.routes")

router.use("/:userID/co-passengers", coPassengerRoutes)

module.exports = router

// users/userID/co-passengers => []
// users/userID/co-passengers/coPassengerID => {}
