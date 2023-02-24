const btnEl = document.querySelector('.btn');

function onClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return
  };
  
  const instance = basicLightbox.create(`
    <div class="modal">
      <h1 class="modal_title">Todo List</h1>
      <form class="form">
      <input type="text" class="form_input" placeholder="tasks for today">
      <button type="submit" class="form_btn"></button>
      </form>
    </div>
`);

  instance.show();

  const formBtn = document.querySelector('.form_btn');
  const form = document.querySelector('.form');
  const input = document.querySelector('.form_input');

    function render(e) {
      return `<div class="wrapper">
      <p class="task_text">${input.value}</p>
      <a class="task_btn">
      </div>
      `
    };

  formBtn.addEventListener('click', onSubmit);

  function onSubmit(e) {
    e.preventDefault();

    if (input.value !== '' && input.value.length < 35) {
      form.insertAdjacentHTML('afterend', render());
    };

    function lineThrough(e) {
      if (e.target.nodeName !== 'P') {
        return
      };
      e.target.style.textDecoration = 'line-through';
      e.target.style.color = 'grey';
    };

    function deleteTask(e) {
      e.preventDefault();

      if (e.target.nodeName !== 'A') {
        return
      };
      e.target.parentNode.remove();
    };

    window.addEventListener('click', deleteTask);
    window.addEventListener('click', lineThrough);
  };
}

btnEl.addEventListener('click', onClick);