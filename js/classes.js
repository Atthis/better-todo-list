import { toggleActiveClass, defineListTitle, showRemainingTasks } from './utils.js';

/**
 * Create specific list element : a tasks list
 */
class List {
  /**
   * Create a tasks list element
   * @param {string} name - name of the element
   */
  constructor(name) {
    (this.name = name), (this.id = name.replace(/\W/g, '-')), (this.tasks = []);
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

  createDOMTask(list, numberContainer) {
    const newTask = document.createElement('div');
    newTask.classList.add('task');

    newTask.innerHTML = `
          <input type="checkbox" name="${this.name.replace(
            /\W/g,
            '-'
          )}" id="task-${this.id}" ${this.done ? 'checked' : ''}>
          <label for="task-${this.id}"><span class="custom-checkbox"></span>${
      this.name
    }</label>`;

    newTask.querySelector(`#task-${this.id}`).addEventListener('click', () => {
      this.done ? (this.done = false) : (this.done = true);
      // numberContainer.innerText = showRemainingTasks(list);
    });

    // numberContainer.innerText = showRemainingTasks(list);
    
    return newTask;
  }

}

/*
Modifier l'id des tâches pour qu'il ne soit pas associé à la longueur du tableau -> risque de doublons lors de la suppression de tâches
=> génération d'id unique ?
  -> demande stockage des id, puis suppression lorsque plus nécessaire

Affichage du nombre de tâches en cours - MAJ à la validation des tâches/au changement de liste de tâches

Amelioration : utiliser des documentFragment [https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment]
*/

export { List, Task };
