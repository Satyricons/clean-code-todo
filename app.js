const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createCheckbox = function () {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  return checkbox;
};

const createTaskLabel = function (text) {
  const label = document.createElement('label');
  label.className = 'task';
  label.innerText = text;
  return label;
};

const createEditInput = function () {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'task';
  return input;
};

const createEditButton = function () {
  const button = document.createElement('button');
  button.className = 'edit';
  button.innerText = 'Edit';
  return button;
};

const createDeleteButton = function () {
  const button = document.createElement('button');
  button.className = 'delete';
  const img = document.createElement('img');
  img.src = './remove.svg';
  button.appendChild(img);
  return button;
};

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  listItem.appendChild(createCheckbox());
  listItem.appendChild(createTaskLabel(taskString));
  listItem.appendChild(createEditInput());
  listItem.appendChild(createEditButton());
  listItem.appendChild(createDeleteButton());
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');
  const containsClass = listItem.classList.contains('editMode');

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const moveTask = function (listItem, targetList, newHandler) {
  targetList.appendChild(listItem);
  bindTaskEvents(listItem, newHandler);
};

const taskCompleted = function () {
  moveTask(this.parentNode, completedTasksHolder, taskIncomplete);
};

const taskIncomplete = function () {
  moveTask(this.parentNode, incompleteTaskHolder, taskCompleted);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkBox.addEventListener('change', checkBoxEventHandler);
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
