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

export { toggleActiveClass, defineListTitle, clearContainer };
