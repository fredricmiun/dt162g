const router = require("express").Router();
let Notes = require("../model/notes.model.js");

// Alla anteckningar
router.route("/").get((req, res) => {
  Notes.find()
    .sort({ noteDate: -1 })
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json("Error: " + err));
});

// Visa specifik anteckning
router.route("/:id").get((req, res) => {
  Notes.findById(req.params.id)
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json("Error: " + err));
});

// Addera anteckning till kollektion
router.route("/add").post((req, res) => {
  const noteName = req.body.noteName;
  const noteInformation = req.body.noteInformation;
  const noteDate = new Date();

  const newNote = new Notes({ noteName, noteInformation, noteDate });

  newNote
    .save()
    .then(() => res.json("Notes added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// Ta bort specifik anteckning
router.route("/:id").delete((req, res) => {
  Notes.findByIdAndDelete(req.params.id)
    .then(() => res.json("Notes deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

// Uppdatera specifik post
router.route("/update/:id").post((req, res) => {
  Notes.findById(req.params.id)
    .then(note => {
      note.noteName = req.body.noteName;
      note.noteInformation = req.body.noteInformation;

      note
        .save()
        .then(() => res.json("Notes updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
