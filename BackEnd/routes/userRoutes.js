"use strict"

const express = require("express")
const userController = require("../controllers/userController")
const router = new express.Router()
router.route("/:id").get(userController.getUserById)

module.exports = router
