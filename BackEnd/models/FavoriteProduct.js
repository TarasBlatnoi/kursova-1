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
    deleteFromFavorite: `
    DELETE FROM favoriteproduct 
    WHERE (User_UserID = ?) AND (Product_ProductID = ?);
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

  static async modifyFavoriteProduct(userId, ProductID, sqlQuery) {
    const dataForDB = [userId, ProductID]
    const result = await FavoriteProduct.commitQuery(sqlQuery, dataForDB)
    return result.affectedRows > 0 ? [true] : result
  }

  static async findAllFavoriteProducts(userId) {
    return FavoriteProduct.modifyFavoriteProduct(
      userId,
      null,
      FavoriteProduct.sqlQueries.getAll,
    )
  }

  static async addFavoriteProduct(userId, ProductID) {
    return FavoriteProduct.modifyFavoriteProduct(
      userId,
      ProductID,
      FavoriteProduct.sqlQueries.addToFavorite,
    )
  }

  static async deleteFavoriteProduct(userId, ProductID) {
    return FavoriteProduct.modifyFavoriteProduct(
      userId,
      ProductID,
      FavoriteProduct.sqlQueries.deleteFromFavorite,
    )
  }
}

module.exports = { FavoriteProduct }
