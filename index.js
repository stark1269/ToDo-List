const btnEl = document.querySelector('.btn');

function onClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return
  };
  
  const instance = basicLightbox.create(`
    <div class="modal">
      <h1 class="modal_title">Todo List</h1>
      <form class="form">
      <input name="text" type="text" class="form_input" placeholder="tasks for today">
      <button type="submit" class="form_btn"></button>
      </form>
      <div class="todo-container"></div>
    </div>
`);

  instance.show();

  // =======================================================================================

  function getRender({ id, value }) {
    return `<div id="${id}" class="wrapper">
  <p class="task_text">${value}</p>
  <a class="task_btn"></a>
  </div>`
  };
  
  const form = document.querySelector('.form');
  const todoContainer = document.querySelector('.todo-container');

  let todos = [];
  
  function onSubmit(e) {
    const input = e.target.elements.text
    const { value } = input;
    const newTodo = { id: Date.now(), value };

    e.preventDefault();
    if (!value) {
      return
    } todos.push(newTodo);
    input.value = '';
    render();
    saveTodos();
  };

  function deleteTask(e) {
    if (e.target.nodeName !== 'A') {
      return
    }

    const parent = e.target.parentNode;
    const indexIdTask = todos.findIndex((todo) => Number(parent.id) === todo.id);
    todos.splice(indexIdTask, 1);
    saveTodos();

    parent.remove();
  };

  function saveTodos() {
    try {
      localStorage.setItem('task', JSON.stringify(todos));
    } catch (error) {
      console.error('error')
    };
  };

  function loadTodos() {
    try {
      todos = JSON.parse(localStorage.getItem('task')) || [];
    } catch (error) {
      console.error('error');
    };
  };

  function render() {
    const listItem = todos.map(todo => getRender(todo)).join('');

    todoContainer.innerHTML = listItem;
  };
  
    loadTodos();
    render();

    form.addEventListener('submit', onSubmit);
    document.addEventListener('click', deleteTask);
  };

btnEl.addEventListener('click', onClick);