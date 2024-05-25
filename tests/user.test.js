// test/integration/users.test.js
const request = require("./setupTests")

describe("GET /api/v1/users", () => {
  it("should return all users", async () => {
    const res = await request.get("/api/v1/users/13")
    expect(res.statusCode).toBe(302)
  })
})
