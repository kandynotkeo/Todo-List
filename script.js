// Initialize empty todo list
function Task(uuid, taskInfo, isChecked) {
    this.uuid = uuid;
    this.taskInfo = taskInfo;
    this.isChecked = isChecked;
}
const todos = [];

// Get tasks-list element
const tasksList = document.getElementById('tasks-list');
const form = document.getElementById('task-input');
form.addEventListener('submit', addTodo);

function renderTodo(e) {
    e.preventDefault();
    tasksList.innerHTML = '';

    // Render the todo list
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
        if (todos[i].isChecked) taskText.classList.add('strike-text');
        else taskText.classList.remove('strike-text');
        taskText.innerText = todos[i].taskInfo;

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash');
        trashIcon.addEventListener('click', deleteTodo);

        // Build DOM, assign uuid and isChecked data attributes
        taskDiv.appendChild(checkIcon);
        taskDiv.appendChild(taskText);
        taskDiv.appendChild(trashIcon);
        taskDiv.dataset.uuid = todos[i].uuid;
        taskDiv.dataset.isChecked = todos[i].isChecked;
        tasksList.appendChild(taskDiv);
    }
}

// Add task
function addTodo(e) {
    // Read value from input
    const taskInput = document.getElementById('new-task');
    const info = taskInput.value;

    // Add task to todos
    if (info !== '') {
        const uuid = window.crypto.randomUUID();
        const newTask = new Task(uuid, info, false);
        todos.push(newTask);
        taskInput.value = '';
    }

    renderTodo(e);
}

// Check task
function checkTodo(e) {
    // Get task with uuid
    const uuid = e.target.parentElement.dataset.uuid;
    const taskToCheck = todos.find(task => task.uuid === uuid);

    // Toggle isChecked attribute
    taskToCheck.isChecked = !taskToCheck.isChecked;

    renderTodo(e);
}

// Delete task
function deleteTodo(e) {
    // Get task with uuid
    const uuid = e.target.parentElement.dataset.uuid;

    // Remove task from todos
    todos.splice(todos.findIndex(task => task.uuid === uuid), 1);

    renderTodo(e);
}