"use strict"

require("dotenv").config()
const path = require("path")
const express = require("express")
const db = require("./database")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const passport = require("passport")
const authentificationRoutes = require("./routes/authentificationRoutes")
const favoriteRoutes = require("./routes/favoriteRoutes")
require("./auth/passport")
const session = db.session
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    store: db.sessionStore,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
)

app.use(express.static(path.join(__dirname, "../public")))
const PORT = process.env.PORT || 3000

// app.get("/login", (req, res, next) => {
//   if (req.session.viewCount) {
//     req.session.viewCount = req.session.viewCount + 1
//   } else {
//     req.session.viewCount = 1
//   }
//   res.send(`<h1>You have visited this page times ${req.session.viewCount}</h1>`)
//   next()
// })

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  console.log(req.session)
  console.log(req.user)
  next()
})

app.use("/api/v1/users", userRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/", favoriteRoutes)
app.use("/", authentificationRoutes)

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

const closeServer = async () => {
  console.log("\nStarting the process of closing the app...")
  try {
    await db.pool.end()
    await db.promisePool.end()
    await server.close(() => {
      console.log("App is closed :(")
      process.exit()
    })
  } catch (err) {
    console.error("Error while closing the app: " + err.message)
    process.exit(1)
  }
}

process.on("SIGINT", closeServer)
process.on("SIGTERM", closeServer)
