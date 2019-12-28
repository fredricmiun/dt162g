/* Schema */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  noteName: String,
  noteInformation: String,
  noteDate: String
});

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
