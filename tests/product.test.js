const request = require("supertest")
const { app, closeServer } = require("../BackEnd/server")
require("dotenv").config()
const PORT = process.env.PORT || 3000

describe("GET /api/v1/products", () => {
  let server

  beforeAll((done) => {
    server = app.listen(PORT, () => {
      console.log(`Test server running on http://localhost:${PORT}`)
    })
    done()
  })

  afterAll(async () => {
    await closeServer(server)
  })

  it("should return all products", async () => {
    const res = await request(app).get("/api/v1/products")
    expect(res.statusCode).toBe(200)
    expect(res.body.result.length).toBeGreaterThan(0)
  })
})
