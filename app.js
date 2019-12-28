const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const serverPort = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection success");
});

const notesRouter = require("./routes/notes.js");

app.use("/notes", notesRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("../projekt-miun/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../projekt-miun", "build", "index.html")
    );
  });
}

app.listen(serverPort, () => {
  console.log(`Server started on port: ${serverPort}`);
});
