// Key for todo list
const STORAGE_KEY = 'todosList';

function Task(uuid, taskInfo, isChecked) {
    this.uuid = uuid;
    this.taskInfo = taskInfo;
    this.isChecked = isChecked;
}

function getTodos() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (todos === null) return [];
    return todos;
}

function pushTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Render info-tab element
function timeSet() {
    const timeTab = document.getElementById('info-tab').getElementsByTagName('strong')[0];

    const timeFormat = {weekday: 'long', month: 'long', day: 'numeric'};
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const time = new Intl.DateTimeFormat('en-US', timeFormat).format(now);
    timeTab.innerText = `${time}`;

    setTimeout(timeSet, tomorrow - now);
}

function activeTasksNumber() {
    const activeTasks = document.getElementById('info-tab').getElementsByClassName('tasks-text')[0];

    const todos = getTodos();
    const activeList = todos.filter(task => !task.isChecked);
    activeTasks.innerText = `${activeList.length} Active Tasks`;
}

// Render tasks-list element
function renderTodo() {
    const tasksList = document.getElementById('tasks-list');
    const form = document.getElementById('task-input');
    form.addEventListener('submit', addTodo);
    form.querySelector('#new-task').focus();

    tasksList.innerHTML = '';

    // Render the todo list
    const todos = getTodos();
    activeTasksNumber();

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
function addTodo() {
    const todos = getTodos();

    // Read value from input
    const taskInput = document.getElementById('new-task');
    const info = taskInput.value;

    // Add task to todos
    if (info !== '') {
        taskInput.value = '';

        const uuid = crypto.randomUUID();
        const newTask = new Task(uuid, info, false);

        todos.push(newTask);
        pushTodos(todos);
    }

    renderTodo();
}

// Check task
function checkTodo(e) {
    const todos = getTodos();

    // Get task with uuid
    const uuid = e.target.parentElement.dataset.uuid;
    const taskToCheck = todos.find(task => task.uuid === uuid);

    // Toggle isChecked attribute
    taskToCheck.isChecked = !taskToCheck.isChecked;

    pushTodos(todos);

    renderTodo();
}

// Delete task
function deleteTodo(e) {
    const todos = getTodos();

    // Get task with uuid
    const uuid = e.target.parentElement.dataset.uuid;

    // Remove task from todos
    pushTodos(todos.filter(task => task.uuid !== uuid));

    renderTodo();
}

// Initial render
timeSet();
renderTodo();