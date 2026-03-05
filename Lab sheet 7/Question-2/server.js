const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/bookfinder");

const bookSchema = new mongoose.Schema({
title:String,
author:String,
category:String,
price:Number,
rating:Number,
year:Number
});

const Book = mongoose.model("Book",bookSchema);


/* Add Book */

app.post("/books",async(req,res)=>{

const book=new Book({
title:req.body.title,
author:req.body.author,
category:req.body.category,
price:req.body.price,
rating:req.body.rating,
year:req.body.year
});

await book.save();

res.json({message:"Book Added"});
});


/* Search Books */

app.get("/books/search",async(req,res)=>{

const title=req.query.title;

const books=await Book.find({
title:{$regex:title,$options:"i"}
});

res.json(books);

});


/* Filter by Category */

app.get("/books/category/:category",async(req,res)=>{

const category=req.params.category;

const books=await Book.find({
category:category
});

res.json(books);

});


/* Sort by Price */

app.get("/books/sort/price",async(req,res)=>{

const books=await Book.find().sort({price:1});

res.json(books);

});


/* Sort by Rating */

app.get("/books/sort/rating",async(req,res)=>{

const books=await Book.find().sort({rating:-1});

res.json(books);

});


/* Top Rated */

app.get("/books/top",async(req,res)=>{

const books=await Book.find({
rating:{$gte:4}
}).limit(5);

res.json(books);

});


/* Pagination */

app.get("/books",async(req,res)=>{

const page=parseInt(req.query.page)||1;

const limit=5;

const books=await Book.find()
.skip((page-1)*limit)
.limit(limit);

res.json(books);

});


app.listen(3000,()=>{
console.log("Server running on port 3000");
});