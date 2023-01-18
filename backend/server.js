const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { errorHandler, notFound } = require("./middelwares/errorMiddelwares");

const app = express();

connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.use(errorHandler);
app.use(notFound);
console.log(process.env.PORT);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on ${PORT}`));
