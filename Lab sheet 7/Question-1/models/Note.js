const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_date: {
        type: String,
        default: new Date().toISOString().split("T")[0]
    }
});

module.exports = mongoose.model("Note", NoteSchema);
