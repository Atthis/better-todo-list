import { List, Task } from './classes.js';

const taskListsContainer = document.querySelector('#task-lists');
let taskList = [];

const newListName = document.querySelector('#new-list-name');
const newList = document.querySelector('#new-list');

const tasksContainer = document.querySelector('#tasks');
const listTitle = document.querySelector('#list-title');

const newTaskName = document.querySelector('#new-task-name');
const newTask = document.querySelector('#new-task');

const deleteListBtn = document.querySelector('#delete-list');

let allLists = [];

window.addEventListener('load', () => {
  if (allLists.length === 0) return;

  allLists.forEach(list => {
    const DOMList = list.createDOMTasksList(
      'task-list',
      tasksContainer,
      listTitle
    );

    if (allLists.length === 1) DOMList.classList.add('active-list');

    taskListsContainer.appendChild(DOMList);
  });
});

// Adding list form
newList.addEventListener('click', e => {
  e.preventDefault();

  if (newListName.value === null || newListName.value === '') return;

  // Throw error if name already used
  if (
    allLists.length > 0 &&
    allLists.filter(
      list =>
        list.hasOwnProperty('id') &&
        list.id === newListName.value.replace(/\W/g, '')
    ).length > 0
  ) {
    // Create visual effect for errors
    console.error('Name already used');
    return;
  }

  const list = new List(newListName.value);

  const DOMList = list.createDOMTasksList(
    'task-list',
    tasksContainer,
    listTitle
  );

  if (allLists.length === 0) DOMList.classList.add('active-list');

  taskListsContainer.appendChild(DOMList);

  allLists.push(list);

  if (allLists.length === 1) {
    tasksContainer.innerHTML = '';

    tasksContainer.append(...list.displayTasks(listTitle));
  }

  newListName.value = '';

  deleteListBtn.removeAttribute('disabled');

  console.log(allLists);
});

deleteListBtn.addEventListener('click', e => {
  e.preventDefault();

  const currentListDOMEl = document.querySelector('.active-list');
  const currentListObject = allLists.find(el => el.id === currentListDOMEl.id);

  taskListsContainer.removeChild(currentListDOMEl);

  allLists.splice(allLists.indexOf(currentListObject), 1);

  if (allLists.length <= 0) {
    deleteListBtn.setAttribute('disabled', '');
    return;
  }

  taskListsContainer.firstElementChild.classList.add('active-list');
});

newTask.addEventListener('click', e => {
  e.preventDefault();

  if (allLists.length === 0) {
    console.error('no list');
    return;
  }

  if (newTaskName.value === null || newTaskName.value === '') return;

  const activeListId = document.querySelector('.active-list').id;
  const activeList = allLists.filter(list => list.id === activeListId)[0];

  const task = new Task(newTaskName.value, activeList.tasks.length);

  activeList.tasks.push(task);

  tasksContainer.appendChild(task.createDOMTask());

  newTaskName.value = '';
});
