const express = require("express");
const mongoose = require("mongoose")
const noteModel = require("../models/note")

const router = express.Router();

// Post
router.post("/note", async (req, res) => {
    try {
        const { title, description } = req.body;
        const user = req.user;
        const note = await noteModel.create({ title, description, user })

        return res.status(200).json({
            message: "Note successfully created.",
            note
        })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

// GET ALL notes
router.get("/note", async (req, res) => {
    try {
        const user = req.user;
        const notes = await noteModel.find({ user })

        return res.status(200).json({
            notes,
            message: "All notes Fetched."
        })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

// Get Specific note
router.get("/note/:id", async (req, res) => {

    try {
        const note = await noteModel.find({ _id: req.params.id });
        return res.status(200).json({
            status: "Success",
            note
        })
    } catch (err) {
        return res.status(404).json({
            status: "There is no note with that id",
            message: err.message
        })
    }
});


//Update a note
router.put("/note/:id", async (req, res) => {
    try {
        const noteIdToUpdate = req.params.id
        if (mongoose.isValidObjectId(noteIdToUpdate)) {
            const note = await noteModel.findOne({ _id: noteIdToUpdate })
            if (!note) {
                return res.status(404).json({
                    message: `Note with id ${noteIdToUpdate} does not exist!`
                })
            }

            if ((note.user).toHexString() !== req.user) {
                return res.status(401).json({
                    message: "You are not authorized to edit this note"
                })
            } else {
                const { title, description } = req.body

                let note = await noteModel.findByIdAndUpdate(noteIdToUpdate, {
                    title,
                    description,
                })

                return res.status(200).json({
                    message: "Successfully Updated",
                    note
                })
            }
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

//DELETE Specific note
router.delete("/note/:id", async (req, res) => {
    try {
        const noteIdToDelete = req.params.id
        if (mongoose.isValidObjectId(noteIdToDelete)) {
            const note = await noteModel.findOne({ _id: noteIdToDelete })
            if (!note) {
                return res.status(404).json({
                    message: ` Note with id ${noteIdToDelete} does not exist!`
                })
            }

            if ((note.user).toHexString() !== req.user) {
                return res.status(401).json({
                    message: "You are not authorized to delete this note"
                })
            }
            else {
                const note = await noteModel.findByIdAndDelete(noteIdToDelete)

                return res.status(200).json({
                    message: "Successfully Deleted",
                    note
                })
            }
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

//DELETE ALL Note
router.delete("/note", async (req, res) => {
    try {
        const user=req.user;
        let deletenote = await noteModel.deleteMany({user})
        // console.log(deletenote);
        return res.status(200).json({
            message: "Successfully ALL Deleted",
            deletenote
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

module.exports = router