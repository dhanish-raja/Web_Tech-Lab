const API = "http://localhost:3000/notes";

function addNote(){

    const data = {
        title: document.getElementById("title").value,
        subject: document.getElementById("subject").value,
        description: document.getElementById("description").value
    };

    fetch(API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(()=>loadNotes());
}


function loadNotes(){

    fetch(API)
    .then(res=>res.json())
    .then(data=>{

        const container=document.getElementById("notes");
        container.innerHTML="";

        data.forEach(note=>{

            container.innerHTML+=`
            <div style="border:1px solid black;margin:10px;padding:10px;">
                <h3>${note.title}</h3>
                <p><b>Subject:</b> ${note.subject}</p>
                <p>${note.description}</p>

                <button onclick="deleteNote('${note._id}')">Delete</button>
                <button onclick="editNote('${note._id}')">Edit</button>
            </div>
            `;
        });

    });
}


function deleteNote(id){

    fetch(API+"/"+id,{
        method:"DELETE"
    })
    .then(()=>loadNotes());
}


function editNote(id){

    const newTitle = prompt("Enter new title");
    const newDescription = prompt("Enter new description");

    fetch(API+"/"+id,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            title:newTitle,
            description:newDescription
        })
    })
    .then(()=>loadNotes());
}


loadNotes();
