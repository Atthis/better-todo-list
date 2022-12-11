import { List, Task } from './classes.js';
import { toggleActiveClass, defineListTitle, clearContainer } from './utils.js';

const taskListsContainer = document.querySelector('#task-lists');
let taskList = [];

const newListForm = document.querySelector('#new-list-form');
const newListName = document.querySelector('#new-list-name');
const newList = document.querySelector('#new-list');

const tasksContainer = document.querySelector('#tasks');
const listTitle = document.querySelector('#list-title');

const newTaskName = document.querySelector('#new-task-name');
const newTask = document.querySelector('#new-task');

const deleteListBtn = document.querySelector('#delete-list');

let allLists = [];

// Load lists from the LS on page load
window.addEventListener('load', () => {
  if (allLists.length === 0) return;

  allLists.forEach((list, i) => {
    const DOMList = list.createDOMTasksList(
      'task-list',
      tasksContainer,
      listTitle
    );

    if (i === 0) DOMList.classList.add('active-list');

    taskListsContainer.appendChild(DOMList);
  });
});

// Adding list
newList.addEventListener('click', e => {
  // newListForm.addEventListener('submit', e => {
  e.preventDefault();

  console.log(e);

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

  toggleActiveClass(DOMList, 'task-list');

  taskListsContainer.appendChild(DOMList);

  clearContainer(tasksContainer);

  allLists.push(list);

  defineListTitle(listTitle, list.name);

  newListName.value = '';

  deleteListBtn.removeAttribute('disabled');

  console.log(allLists);
});

// Delete list
deleteListBtn.addEventListener('click', e => {
  e.preventDefault();

  const currentListDOMEl = document.querySelector('.active-list');
  const currentListObject = allLists.find(el => el.id === currentListDOMEl.id);

  taskListsContainer.removeChild(currentListDOMEl);

  allLists.splice(allLists.indexOf(currentListObject), 1);

  if (allLists.length <= 0) {
    deleteListBtn.setAttribute('disabled', '');
    tasksContainer.innerHTML = '';
    listTitle.innerText = '';
    return;
  }

  const newListObject = allLists[allLists.length - 1];
  listTitle.innerText = newListObject.name;

  tasksContainer.innerHTML = '';
  tasksContainer.append(...newListObject.displayTasks(listTitle));

  // document.querySelector(`.${newListObject.id}`).classList.add('active-list');

  toggleActiveClass(
    document.querySelector(`#${newListObject.id}`),
    'task-list'
  );
});

// Adding task
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
