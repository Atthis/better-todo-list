const uniqueRandomNumberGenerator = function (numberList) {
  let uniqueNumber = Math.floor(Math.random() * 10);

  while (numberList.indexOf(uniqueNumber) !== -1 && numberList.length < 10) {
    uniqueNumber = Math.floor(Math.random() * 10);
  }

  if (numberList.length === 10) console.warn('Max tasks number reach'); // Ensure loop exit in case tasks number > 100

  numberList.push(uniqueNumber);

  return uniqueNumber;
};

const toggleActiveClass = function (list, taskListClass) {
  document
    .querySelectorAll(`.${taskListClass}`)
    .forEach(list => list.classList.remove('active-list'));

  list.classList.add('active-list');
};

// Récupérer les taches effectuées
const getDoneTasks = function (tasks) {
  const doneTasks = tasks.filter(task => task.done === true);
  return doneTasks;
};

// Afficher le nombre de tâches restantes
const showRemainingTasks = function ({ tasks }) {
  const remainingTasks = tasks.length - getDoneTasks(tasks).length;
  return remainingTasks;
};

export {
  toggleActiveClass,
  uniqueRandomNumberGenerator,
  getDoneTasks,
  showRemainingTasks,
};

/*
TO show remaining tasks, i need to know how many remaining tasks, and show the number in the dom element

To know how many remaining tasks, i need to select all the done: false tasks of the current list, and count the length

To show the number on the DOM, i need to select the DOM element, and change its text value
*/
