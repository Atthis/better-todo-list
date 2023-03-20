import { toggleActiveClass } from './utils.js';
import List from './list.js';
import Task from './task.js';

const taskListsContainer = document.querySelector('#task-lists');

const newListForm = document.querySelector('#new-list-form');
const newListName = document.querySelector('#new-list-name');
const newList = document.querySelector('#new-list');

const tasksContainer = document.querySelector('#tasks');
const listTitle = document.querySelector('#list-title');
const remainingTasks = document.querySelector('#tasks-number');

const newTaskName = document.querySelector('#new-task-name');
const newTask = document.querySelector('#new-task');

const deleteListBtn = document.querySelector('#delete-list');

const allLists = [];
const maxTasksNumber = 10;

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
newListForm.addEventListener('submit', e => {
  e.preventDefault();

  if (newListForm.name.value === null || newListForm.name.value === '') return;

  // Throw error if name already used
  if (
    allLists.length > 0 &&
    allLists.filter(
      list =>
        list.hasOwnProperty('id') &&
        list.id === newListForm.name.value.replace(/\W/g, '-')
    ).length > 0
  ) {
    // Create visual effect for errors
    console.error('Name already used');
    return;
  }

  // JS actions
  const list = new List(newListForm.name.value);

  allLists.push(list);

  // DOM actions
  const DOMList = list.createDOMTasksList('task-list');

  DOMList.addEventListener('click', function (e) {
    toggleActiveClass(this, 'task-list');

    tasksContainer.innerHTML = '';

    tasksContainer.append(...list.displayTasks(listTitle, remainingTasks));
  });

  toggleActiveClass(DOMList, 'task-list');

  taskListsContainer.appendChild(DOMList);

  tasksContainer.innerHTML = '';

  remainingTasks.innerText = 0;

  list.defineListTitle(listTitle, list.name);

  newListForm.name.value = '';

  if (deleteListBtn.hasAttribute('disabled'))
    deleteListBtn.removeAttribute('disabled');
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
  tasksContainer.append(
    ...newListObject.displayTasks(listTitle, remainingTasks)
  );

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

  // if(activeList.tasks.length === maxTasksNumber)

  const task = new Task(newTaskName.value, activeList);

  activeList.tasks.push(task);

  tasksContainer.appendChild(task.createDOMTask(activeList, remainingTasks));

  newTaskName.value = '';
});
