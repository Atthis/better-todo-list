const uniqueRandomNumberGenerator = function (numberList) {
  let uniqueNumber = Math.floor(Math.random() * 100);

  if (numberList.indexOf(uniqueNumber) > -1)
    uniqueNumber = uniqueRandomNumberGenerator(numberList);

  return uniqueNumber;
};

const toggleActiveClass = function (list, taskListClass) {
  document
    .querySelectorAll(`.${taskListClass}`)
    .forEach(list => list.classList.remove('active-list'));

  list.classList.add('active-list');
};

const defineListTitle = function (title, listName) {
  title.innerText = listName;
};

const clearContainer = function (container) {
  container.innerHTML = '';
};

// Récupérer les taches effectuées
const getDoneTasks = function (tasks) {
  const doneTasks = tasks.filter(task => task.done === true);
  return doneTasks;
};

// Afficher le nombre de tâches effectuées
const showRemainingTasks = function ({tasks}) {
  const remainingTasks = tasks.length - getDoneTasks(tasks).length;
  return remainingTasks;
};

export {
  toggleActiveClass,
  defineListTitle,
  clearContainer,
  uniqueRandomNumberGenerator,
  getDoneTasks,
  showRemainingTasks,
};

/*
TO show remaining tasks, i need to know how many remaining tasks, and show the number in the dom element

To know how many remaining tasks, i need to select all the done: false tasks of the current list, and count the length

To show the number on the DOM, i need to select the DOM element, and change its text value
*/
