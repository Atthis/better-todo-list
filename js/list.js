export default class List {
  constructor(name, id) {
    (this.name = name),
      (this.id = id),
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

  // fonction création element du DOM avec ajout event listener
  createDOMElement(parent) {
    const newList = document.createElement('li');
    newList.innerText = this.name;
    newList.id = this.id;
    newList.classList.add('task-list');

    parent.appendChild(newList);
  }

  // fonction affichage des taches
  displayTasks(parent) {
    parent.innerHTML = '';

    this.tasks.forEach((task, index) => {
      // task.display(parent, index)
      // display method content below
      const newTask = document.createElement('div');
      newTask.classList.add('task');

      newTask.innerHTML = `
            <input type="checkbox" name="" id="task-${index}">
            <label for="task-${index}"><span class="custom-checkbox"></span>${task.name}</label>`;

      parent.appendChild(newTask);
    });
  }


  
}
