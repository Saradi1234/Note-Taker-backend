const express = require("express");
const userRoutes = require("./routes/userRoutes")
const NoteRoutes = require("./routes/NoteRoutes")
const authorization = require("./auth/auth")
const cors = require("cors");

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use("/note", authorization)

app.use(userRoutes)
app.use(NoteRoutes)

app.get("/", (req, res) => {
    res.send("All Ok");
})

module.exports = app