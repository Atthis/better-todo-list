import { uniqueRandomNumberGenerator, showRemainingTasks } from './utils.js';

/**
 * Create specific list element : a task
 */
export default class Task {
  /**
   * Create a task element
   * @param {string} name - name of the element
   * @param {Object} parent - List object parent of the task
   */
  constructor(name, parent) {
    (this.name = name),
      (this.id = uniqueRandomNumberGenerator(parent.tasksId)),
      (this.done = false);
  }

  /**
   *
   * @param {Object} list - List object containing tasks
   * @param {Element} numberContainer - DOM element displaying remaining tasks numbers
   * @returns {Element} - Task DOM element
   */
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
      numberContainer.innerText = showRemainingTasks(list);
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
*/
