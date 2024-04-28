"use strict"

const { FavoriteProduct } = require("../models/FavoriteProduct.js")

const asyncWrapper = (callback) => {
  return async function (req, res) {
    const args = []
    try {
      args.push(req.user.UserID)
      if (req.body) {
        args.push(req.body)
      }
      const result = await callback(...args)
      if (result.length) {
        res.status(200).json({ result })
      } else {
        res.status(404).json({ errorMessage: "No such product" })
      }
    } catch (err) {
      console.error(err)
      res.status(404).json({ errorMessage: err.message })
    }
  }
}

const getAllFavoriteproducts = asyncWrapper(
  FavoriteProduct.findAllFavoriteProducts,
)
const addToFavorite = asyncWrapper(FavoriteProduct.addFavoriteProduct)
// const createProduct = asyncWrapper(Product.create)
// const updateProduct = asyncWrapper(Product.updateById)
// const deleteProduct = asyncWrapper(Product.deleteById)

module.exports = {
  getAllFavoriteproducts,
  addToFavorite,
  //   createProduct,
  //   updateProduct,
  //   deleteProduct,
}
