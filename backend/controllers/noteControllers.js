const expressAsyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

const getNotes = expressAsyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const createNote = expressAsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the Fields");
  } else {
    const note = new Note({ user: req.user._id, title, content, category });
    const createdNote = await note.save();
    res.status(201).json(createdNote);
    console.log(createdNote);
  }
});

const getNoteById = expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});
const updateNote = expressAsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== note.user._id.toString()) {
    res.status(401);
    throw new Error("You can`t perform this action");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updateNote = await note.save();
    res.json(updateNote);
  } else {
    res.status(404);
    throw new Error("Note is not found");
  }
});
const deleteNote = expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note.user.toString() !== note.user._id.toString()) {
    res.status(401);
    throw new Error("You can`t perform this action");
  }

  if (note) {
    await note.remove();
    res.status(200).json({ message: "Note removed !" });
  } else {
    res.status(404);
    throw new Error("Note is not found");
  }
});

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };
