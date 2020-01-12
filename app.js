const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Används för att ansluta till MongoDB Atlas. "Environmental Variables".
// I .env filen för projektet så lägger vi till anslutnings - strängen. Den får vi från MongoDB Atlas.
require("dotenv").config();

// Skapa express server
const app = express();
const serverPort = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Anslutning med några bool-inställningar för att hantera nya express uppdateringar
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

// Om vi är i produktion kör den här kodsnutten
if (process.env.NODE_ENV === "production") {
  // Om vi är i produktion
  // Sätt en statisk katalog som vår build sker till
  app.use(express.static("projekt-miun/build"));

  // Här berättar vi var build ska ske någonstans
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "projekt-miun", "build", "index.html")
    );
  });
}

app.listen(serverPort, () => {
  console.log(`Server started on port: ${serverPort}`);
});
