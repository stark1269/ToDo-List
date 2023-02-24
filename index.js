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
    </div>
`);

  instance.show();
  loadTask();

  const formBtn = document.querySelector('.form_btn');
  const form = document.querySelector('.form');
  const input = document.querySelector('.form_input');

function loadTask() {
  try {
    const taskJSON = localStorage.getItem('task');
    if (!taskJSON) {
      console.log('В локальном хранилище нет задач.');
      return;
    }
    const tasks = JSON.parse(taskJSON);
    const tasksHTML = tasks
      .map(task => `
        <div class="wrapper">
          <p class="task_text">${task.name}</p>
          <a class="task_btn"></a>
        </div>
      `)
      .join('');
    const form = document.querySelector('.form');
    form.insertAdjacentHTML('afterend', tasksHTML);
  } catch (error) {
    console.error(`Ошибка при загрузке задач: ${error.message}`);
  }
};

    function render() {
      return `<div class="wrapper">
      <p class="task_text">${input.value}</p>
      <a class="task_btn"></a>
      </div>
      `
  };

  let todos = [];
  
  formBtn.addEventListener('click', onSubmit);

  function onSubmit(e) {
    e.preventDefault();

    if (input.value !== '' && input.value.length < 35) {
      form.insertAdjacentHTML('afterend', render());
      function getFormData() {
      return { name: input.value.trim() };
      };
      const formData = getFormData();
      todos.push(formData);
      
      localStorage.setItem('task', JSON.stringify(todos));
      input.value = ''
    };
  };
};

function deleteTask(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'A') {
    return
  };
  e.target.parentNode.remove();
  localStorage.removeItem('task')
};

function lineThrough(e) {
  if (e.target.nodeName !== 'P') {
    return
  };
  e.target.style.textDecoration = 'line-through';
  e.target.style.color = 'grey';
};

window.addEventListener('click', lineThrough);
window.addEventListener('click', deleteTask);
btnEl.addEventListener('click', onClick);