import { toggleActiveClass, showRemainingTasks } from './utils.js';

export default class List {
  /**
   * Create a tasks list element
   * @param {string} name - name of the element
   */
  constructor(name) {
    (this.name = name),
      (this.id = name.replace(/\W/g, '-')),
      (this.tasks = []),
      (this.tasksId = []);
  }

  /**
   * Create DOM Tasks list element
   * @param {string} taskListClass - class to add to new task list
   * @returns - new list object
   */
  createDOMTasksList(taskListClass, tasksContainer, title, numberContainer) {
    const newList = document.createElement('li');
    newList.innerText = this.name;
    newList.id = this.id;
    newList.classList.add(taskListClass);

    newList.addEventListener('click', e => {
      toggleActiveClass(newList, taskListClass);

      tasksContainer.innerHTML = '';

      tasksContainer.append(...this.displayTasks(title, numberContainer));
    });

    return newList;
  }

  /**
   * Display active list title on the page
   * @param {Element} title
   * @param {string} listName
   */
  defineListTitle(title, listName) {
    title.innerText = listName;
  }

  /**
   * Display all tasks of the active list
   * @param {Element} title
   * @returns {Array} - array of all tasks DOM elements
   */
  displayTasks(title, numberContainer) {
    this.defineListTitle(title, this.name);

    let tasks = [];

    this.tasks.forEach(task => {
      tasks.push(task.createDOMTask(this, numberContainer));
    });

    showRemainingTasks(this);

    return tasks;
  }
}
