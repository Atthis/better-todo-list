import { List } from './classes.js';

/* améliorations :
- envoyer les tâches dans le LS -> stocker les listes qui sont réalisées
*/

/* ---  --- */
let lists = [
  {
    name: 'YouTube',
    tasks: [
      {
        name: 'record todo list video',
        done: true,
      },
      {
        name: 'edit todo list video',
        done: false,
      },
      {
        name: 'publish todo list video',
        done: false,
      },
    ],
  },
  {
    name: 'Work',
    tasks: [
      {
        name: 'first task to do',
        done: false,
      },
      {
        name: 'second task to do',
        done: false,
      },
    ],
  },
  {
    name: 'Grocery',
    tasks: [
      {
        name: 'apples',
        done: false,
      },
      {
        name: 'butter',
        done: true,
      },
    ],
  },
];


const taskListsContainer = document.querySelector('#task-lists');
let taskList = Array.from(document.querySelectorAll('.task-list'));

const tasksContainer = document.querySelector('#tasks');
const newListName = document.querySelector('#new-list-name');
const newList = document.querySelector('#new-list');

let allLists = [];

// Adding list form
newList.addEventListener('click', e => {
  e.preventDefault();

  if (newListName.value === null || newListName.value === '') return;

  if (
    allLists.length > 0 &&
    allLists.filter(
      list => list.hasOwnProperty('id') && list.id === newListName.value
    ).length > 0
  ) {

    // Create visual effect for errors
    console.error('Name already used');
    return;
  }
  let list = new List(newListName.value);

  newListName.value = '';

  // list.createDOMTasksList(taskListsContainer);
  taskListsContainer.appendChild(list.createDOMTasksList());

  allLists.push(list);

  if (allLists.length === 1) {
    tasksContainer.innerHTML = '';

    tasksContainer.append(...list.displayTasks());
  }
});

const observerConfig = { childList: true };

const listObserverCallback = mutationList => {
  mutationList.forEach(mutation => {
    const addedNodes = Array.from(mutation.addedNodes);

    if (allLists.length === 1) {
      addedNodes[0].classList.add('active-list');
    }

    addedNodes[0].addEventListener('click', e => {
      taskList.forEach(list => list.classList.remove('active-list'));
      e.target.classList.add('active-list');

      tasksContainer.innerHTML = '';

      const currentList = allLists.filter(
        list => list.hasOwnProperty('id') && list.id === e.target.id
      )[0];

      tasksContainer.append(...currentList.displayTasks());

      // allLists[e.target.id].displayTasks(tasksContainer);
    });

    taskList.push(...addedNodes);
  });
};

const listsObserver = new MutationObserver(listObserverCallback);

listsObserver.observe(taskListsContainer, observerConfig);


/*
Suppression d'une liste :
- récupérer l'id de la liste en cours d'affichage
- supprimer l'objet du tableau
- supprimer le noeud du DOM

*/