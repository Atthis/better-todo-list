/**
 * Create new list item, as tasks list or unique task
 */
class ListElement {
  /**
   * Create an element
   * @param {String} name - name of the element
   * @param {String} id - id of the element
   */
  constructor(name) {
    (this.name = name), (this.id = name.replace(/\W/g, ''));
  }
}

/**
 * Create specific list element : a tasks list
 * @extends ListElement
 */
class List extends ListElement {
  /**
   * Create a tasks list element
   * @param {string} name - name of the element
   * @param {number} id - id of the element
   */
  constructor(name) {
    super(name),
      (this.tasks = [
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
      ]);
  }

  /**
   * Create DOM Tasks list element
   * @param {array} allLists array of all existing lists
   * @param {object} tasksContainer DOM element that contains lists
   */
  createDOMTasksList(allLists, taskListClass, tasksContainer) {
    const newList = document.createElement('li');
    newList.innerText = this.name;
    newList.id = this.id;
    newList.classList.add(taskListClass);

    if (allLists.length === 0) newList.classList.add('active-list');

    this.createClickEventListener(newList, taskListClass, tasksContainer);

    return newList;
  }

  /**
   * Add the event listener to the list instance
   * @param {object} list list object created
   * @param {array} allLists array of all existing lists
   * @param {object} tasksContainer DOM element that contains lists
   */
  createClickEventListener(list, taskListClass, tasksContainer) {
    list.addEventListener('click', e => {
      document.querySelectorAll(`.${taskListClass}`).forEach(list => list.classList.remove('active-list'))

      e.target.classList.add('active-list');

      tasksContainer.innerHTML = '';

      tasksContainer.append(...this.displayTasks());
    });
  }

  displayTasks() {
    let tasks = [];

    this.tasks.forEach((task, index) => {
      tasks.push(Task.prototype.createDOMTask(task, index));
    });

    return tasks;
  }
}

/**
 * Create specific list element : a task
 * @extends ListElement
 */
class Task extends ListElement {
  constructor(name) {
    super(name), (this.done = false);
  }

  createDOMTask(task, index) {
    const newTask = document.createElement('div');
    newTask.classList.add('task');

    newTask.innerHTML = `
          <input type="checkbox" name="" id="task-${index}">
          <label for="task-${index}"><span class="custom-checkbox"></span>${task.name}</label>`;

    return newTask;
  }
}

export { List, Task };
