const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const todoColumn = document.getElementById('todo');

// 1. Function to create a new task
addTaskBtn.addEventListener('click', () => {
    const taskName = taskInput.value;
    if (taskName === "") return alert("Please enter a task!");

    const taskId = "task-" + Date.now(); // Unique ID
    const date = new Date().toLocaleDateString();

    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.id = taskId;
    taskCard.draggable = true;
    
    // Set internal HTML
    taskCard.innerHTML = `
        <strong>${taskName}</strong>
        <small>Created: ${date}</small>
    `;

    // Drag Logic: Store the ID of the element being dragged
    taskCard.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData("text", e.target.id);
    });

    todoColumn.appendChild(taskCard);
    taskInput.value = ""; // Clear input
});

// 2. Allow dropping (Standard HTML5 requirement)
function allowDrop(e) {
    e.preventDefault();
}

// 3. Handle the Drop
function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    
    // Find the column (handling case where user drops on text inside column)
    const column = e.target.closest('.column');
    
    if (column) {
        column.appendChild(draggedElement);

        // Check if dropped into Completed
        if (column.id === 'completed') {
            draggedElement.classList.add('is-completed');
            alert("Task Completed Successfully");
        } else {
            draggedElement.classList.remove('is-completed');
        }
    }
}