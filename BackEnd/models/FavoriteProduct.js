const db = require("../database")
class FavoriteProduct {
  static sqlQueries = {
    getAll: `
        SELECT *
        FROM product
        WHERE ProductID IN (
        SELECT Product_ProductID
        FROM favoriteproduct
        WHERE User_UserID = ?
        );
        `,
    addToFavorite: `
        INSERT INTO  favoriteproduct(User_UserID, Product_ProductID) VALUES(?,?);
        `,
  }

  static async commitQuery(sql, data) {
    let connection
    try {
      connection = await db.promisePool.getConnection()
      const [result] = await connection.execute(sql, data)
      return result
    } catch (err) {
      console.error(err)
    } finally {
      if (connection) {
        await connection.release()
      }
    }
  }

  static async findAllFavoriteProducts(userId) {
    const dataForDB = []
    dataForDB.push(userId)
    const products = await FavoriteProduct.commitQuery(
      FavoriteProduct.sqlQueries.getAll,
      dataForDB,
    )
    console.log(products)
    return products
  }
  static async addFavoriteProduct(userId, productID) {
    const dataForDB = []
    dataForDB.push(userId)
    dataForDB.push(productID)
    const products = await FavoriteProduct.commitQuery(
      FavoriteProduct.sqlQueries.addToFavorite,
      dataForDB,
    )
    console.log(products)
    return products
  }
}

module.exports = { FavoriteProduct }
