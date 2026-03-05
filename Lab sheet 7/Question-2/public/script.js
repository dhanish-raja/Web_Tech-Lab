let page=1;


/* Display Books */

function displayBooks(data){

let output="";

data.forEach(book=>{

output+=`
<div class="book">
<h3>${book.title}</h3>
<p>Author: ${book.author}</p>
<p>Category: ${book.category}</p>
<p>Price: ${book.price}</p>
<p>Rating: ${book.rating}</p>
<p>Year: ${book.year}</p>
</div>
`;

});

document.getElementById("books").innerHTML=output;

}


/* Add Book */

function addBook(){

const book={

title:document.getElementById("titleAdd").value,
author:document.getElementById("authorAdd").value,
category:document.getElementById("categoryAdd").value,
price:Number(document.getElementById("priceAdd").value),
rating:Number(document.getElementById("ratingAdd").value),
year:Number(document.getElementById("yearAdd").value)

};

fetch("/books",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(book)

})
.then(res=>res.json())
.then(data=>alert("Book Added"));

}


/* Search */

function searchBook(){

let title=document.getElementById("titleSearch").value;

fetch(`/books/search?title=${title}`)

.then(res=>res.json())

.then(data=>displayBooks(data));

}


/* Filter Category */

function filterCategory(){

let category=document.getElementById("categoryFilter").value;

fetch(`/books/category/${category}`)

.then(res=>res.json())

.then(data=>displayBooks(data));

}


/* Sort Price */

function sortPrice(){

fetch("/books/sort/price")

.then(res=>res.json())

.then(data=>displayBooks(data));

}


/* Sort Rating */

function sortRating(){

fetch("/books/sort/rating")

.then(res=>res.json())

.then(data=>displayBooks(data));

}


/* Top Rated */

function topBooks(){

fetch("/books/top")

.then(res=>res.json())

.then(data=>displayBooks(data));

}


/* Pagination */

function loadMore(){

fetch(`/books?page=${page}`)

.then(res=>res.json())

.then(data=>{

let output="";

data.forEach(book=>{

output+=`
<div class="book">
<h3>${book.title}</h3>
<p>Author: ${book.author}</p>
<p>Category: ${book.category}</p>
<p>Price: ${book.price}</p>
<p>Rating: ${book.rating}</p>
<p>Year: ${book.year}</p>
</div>
`;

});

document.getElementById("books").innerHTML+=output;

page++;

});

}