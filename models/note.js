const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    time:{type: Date, default: Date.now},
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "users" }
})

const noteModel = mongoose.model("todo", noteSchema)

module.exports = noteModel