import { toggleActiveClass, defineListTitle } from './utils.js';

/**
 * Create specific list element : a tasks list
 */
class List {
  /**
   * Create a tasks list element
   * @param {string} name - name of the element
   */
  constructor(name) {
    (this.name = name),
      (this.id = name.replace(/\W/g, '-')),
      (this.tasks = [
        // {
        //   name: 'record todo list video',
        //   done: true,
        // },
        // {
        //   name: 'edit todo list video',
        //   done: false,
        // },
        // {
        //   name: 'publish todo list video',
        //   done: false,
        // },
      ]);
  }

  /**
   * Create DOM Tasks list element
   * @param {string} taskListClass class to add to new task list
   * @param {node} tasksContainer list DOM container
   * @param {node} title liste title DOM container
   * @returns new list object
   */
  createDOMTasksList(taskListClass, tasksContainer, title) {
    const newList = document.createElement('li');
    newList.innerText = this.name;
    newList.id = this.id;
    newList.classList.add(taskListClass);

    this.createClickEventListener(
      newList,
      taskListClass,
      tasksContainer,
      title
    );

    return newList;
  }

  /**
   * Add the event listener to the list instance
   * @param {node} list new list node
   * @param {string} taskListClass class to add to new task list
   * @param {node} tasksContainer list DOM container
   * @param {node} title liste title DOM container
   */
  createClickEventListener(list, taskListClass, tasksContainer, title) {
    list.addEventListener('click', e => {
      toggleActiveClass(e.target, taskListClass);

      tasksContainer.innerHTML = '';

      tasksContainer.append(...this.displayTasks(title));
    });
  }

  displayTasks(title) {
    defineListTitle(title, this.name);

    let tasks = [];

    this.tasks.forEach((task, index) => {
      tasks.push(task.createDOMTask(task, index));
    });

    return tasks;
  }
}

/**
 * Create specific list element : a task
 */
class Task {
  /**
   * Create a task element
   * @param {string} name - name of the element
   */
  constructor(name, id) {
    (this.name = name), (this.id = id), (this.done = false);
  }

  createDOMTask() {
    const newTask = document.createElement('div');
    newTask.classList.add('task');

    newTask.innerHTML = `
          <input type="checkbox" name="${this.name.replace(
            /\W/g,
            '-'
          )}" id="task-${this.id}">
          <label for="task-${this.id}"><span class="custom-checkbox"></span>${
      this.name
    }</label>`;

    return newTask;
  }
}

/*

Gestion du "done" des tasks :
- passer en true quand done
- controler si true ou false à l'affichage (et cocher l'input si true)

Affichage du nombre de tâches en cours - MAJ à la validation des tâches/au changement de liste de tâches

delete task list : 
- afficher les tâches de la nouvelle liste active
Erreur : taches toujours affichées à la suppression de la dernière liste existante
  - si plus de liste, supprimer les éléments du parent

Amelioration : utiliser des documentFragment [https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment]

*/

export { List, Task };
