// Initialize empty todo list
const todos = [];

const tasksList = document.getElementById('tasks-list');
const form = document.getElementById('task-input');
form.addEventListener('submit', addTodo);

function renderTodo(e) {
    e.preventDefault();
    // 3. Manipulate DOM to render the todolist
    const len = todos.length;
    if (len < 1) return;

    for (let i = 0; i < len; i++) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-info');

        const checkIcon = document.createElement('i');
        checkIcon.classList.add('fa-solid', 'fa-circle-check');
        checkIcon.addEventListener('click', checkTodo);

        const taskText = document.createElement('p');
        taskText.classList.add('task-text-info');
        taskText.innerText = todos[i];

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash');
        trashIcon.addEventListener('click', deleteTodo);

        taskDiv.appendChild(checkIcon);
        taskDiv.appendChild(taskText);
        taskDiv.appendChild(trashIcon);
        tasksList.appendChild(taskDiv);
    }
}

// Assign this function to button add
function addTodo(e) {
    // 1. Read value from input
    const taskInput = document.getElementById('new-task');
    const newTodo = taskInput.value;
    // 2. Add value to todos array
    if (newTodo !== '') {
        todos.push(newTodo);
        taskInput.value = '';
    }

    tasksList.innerHTML = '';
    renderTodo(e);
}

function checkTodo(e) {
    const taskDiv = e.target.parentElement;
    const taskToCheck = taskDiv.querySelector('.task-text-info');
    taskToCheck.classList.toggle('strike-text');
}

// Assign this function to trash icon
function deleteTodo(e) {
    const taskDiv = e.target.parentElement;
    const taskToRemove = taskDiv.querySelector('.task-text-info').innerText;
    todos.splice(todos.indexOf(taskToRemove), 1);

    tasksList.innerHTML = '';
    renderTodo(e);
}