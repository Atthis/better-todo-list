import { List } from './classes.js';

const taskListsContainer = document.querySelector('#task-lists');
let taskList = [];

const tasksContainer = document.querySelector('#tasks');
const newListName = document.querySelector('#new-list-name');
const newList = document.querySelector('#new-list');

const deleteListBtn = document.querySelector('#delete-list');

let allLists = [];

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

  let list = new List(newListName.value);

  taskListsContainer.appendChild(
    list.createDOMTasksList(allLists, 'task-list', tasksContainer)
  );

  allLists.push(list);

  if (allLists.length === 1) {
    tasksContainer.innerHTML = '';

    tasksContainer.append(...list.displayTasks());
  }

  newListName.value = '';

  deleteListBtn.removeAttribute('disabled')

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

/*
Suppression d'une liste :
✓ récupérer l'id de la liste en cours d'affichage
✓ supprimer le noeud du DOM
✓ supprimer l'objet du tableau
*/
