// test/setupTests.js
const request = require("supertest")
const { app, closeServer } = require("../BackEnd/server")
require("dotenv").config()

const PORT = process.env.TEST_PORT || 4000 // Default to 4000 if TEST_PORT is not set
let server

beforeAll((done) => {
  server = app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`)
    done()
  })
})

afterAll(async () => {
  await closeServer(server)
})

module.exports = request(app)
