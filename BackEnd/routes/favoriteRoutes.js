"use strict"

const express = require("express")
const favoriteProductController = require("../controllers/favoriteProductController.js")
const { isAuth } = require("../auth/middleware")
const router = new express.Router()
const getHTMLFavorite = (req, res, next) => {
  res.sendFile(__dirname + "/views/favorites.html")
  next()
}
const log = (req, res, next) => {
  console.log(`This is user id ${req.user.UserID}`)
  next()
}
router.use(isAuth)
router.get("/", getHTMLFavorite)
router.get("/products", favoriteProductController.getAllFavoriteproducts)
module.exports = router
