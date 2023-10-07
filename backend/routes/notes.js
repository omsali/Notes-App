const express = require('express');
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator')

//ROUTE : 1 Get all the notes using: GET /api/notes/fetchallnotes  Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        // finding user by id and fetching notes 
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
})

//ROUTE : 2 Adding a note using: POST /api/notes/addnote  Login required
router.post('/addnote', fetchuser, /*[
    body('title', 'Title should br minimun 3 character').isLength({ min: 3 }),
    body('description', 'Description should be minimun 5 character').isLength({ min: 5 })
],*/ async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    //destructuring components of the note from req.body
    const { title, description, tag } = req.body;
    try {
        //creating a new note using Notes schema and assigning the values to a specific userusing user id
        const notes = new Notes({ title, description, tag, user: req.user.id });
        //saving the notes  into the database
        const savedNotes = await notes.save();
        res.json(savedNotes);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
})

//ROUTE : 3 Update a note using : PUT /api/notes/updatenote  Login requied
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //creating a new note and adding changes to it
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //finding the note using note id
        let notes = await Notes.findById(req.params.id);
        //checking wheather the exists or not
        if (!notes) {
            return res.status(404).send("Not found");
        }

        //checking wheather the note is of the specific user by user id and in note user id
        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        //giving the new note to the exisiting note and updating the existing note and if note is not existing adding it
        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ notes });
    } catch {
        res.send(500).json({ error: "Internal server error" });
    }
})

//ROUTE 4: Deleting the existing note using : DELETE /api/notes/deletenote/:id Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //finding the note using id
        let notes = await Notes.findById(req.params.id);
        if (!notes) {
            res.status(404).json({ error: "Not found" });
        }

        //checking wheather user is the user of that note
        if (notes.user.toString() !== req.user.id) {
            res.status(401).json({ error: "Not allowed" });
        }

        //deleting the note using id
        notes = await Notes.findByIdAndDelete(req.params.id);
        res.json({ sucess: "Note deleted sucessfully", notes: notes });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
})

module.exports = router