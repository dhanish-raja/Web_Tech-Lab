const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const Note = require("./models/Note");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/student_notes")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));


// ADD NOTE
app.post("/notes", async (req,res)=>{
    try{
        const note = new Note(req.body);
        const savedNote = await note.save();
        res.json(savedNote);
    }catch(err){
        res.status(500).json(err);
    }
});


// VIEW NOTES
app.get("/notes", async (req,res)=>{
    try{
        const notes = await Note.find();
        res.json(notes);
    }catch(err){
        res.status(500).json(err);
    }
});


// UPDATE NOTE
app.put("/notes/:id", async (req,res)=>{
    try{
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
        );
        res.json(updatedNote);
    }catch(err){
        res.status(500).json(err);
    }
});


// DELETE NOTE
app.delete("/notes/:id", async (req,res)=>{
    try{
        await Note.findByIdAndDelete(req.params.id);
        res.json({message:"Note deleted"});
    }catch(err){
        res.status(500).json(err);
    }
});


app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});
