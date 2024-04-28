const db = require("../database")
class FavoriteProduct {
  static sqlQueries = {
    getAll: `
        SELECT Product_ProductID 
        FROM favoriteproduct
        WHERE User_UserID = ?;
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
}

module.exports = { FavoriteProduct }
