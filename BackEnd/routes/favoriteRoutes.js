"use strict"

const express = require("express")
const productController = require("../controllers/productController")
const { isAuth } = require("../auth/middleware")
const router = new express.Router()
router.get("/favorites", isAuth, (req, res) => {
  res.sendFile(__dirname + "/views/favorites.html")
})
module.exports = router
