// test/setupTests.js
const request = require("supertest")
const db = require("../BackEnd/database")
const { app } = require("../BackEnd/server")
require("dotenv").config()

afterAll(async () => {
  await db.promisePool.end()
})

module.exports = request(app)
