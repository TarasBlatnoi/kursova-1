// test/integration/products.test.js
const request = require("./setupTests")

describe("GET /api/v1/products", () => {
  it("should return all products", async () => {
    const res = await request.get("/api/v1/products")
    expect(res.statusCode).toBe(200)
    expect(res.body.result.length).toBeGreaterThan(0)
  })
})
