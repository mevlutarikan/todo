const inputDOM = document.querySelector('#task');
const liveToastBtn = document.querySelector('#liveToastBtn');
const ulDOM = document.querySelector('#list');
const toastFailDOM = document.querySelector('.failToast');
const toastSuccessDOM = document.querySelector('.successToast');
let todoList = JSON.parse(localStorage.getItem('toDo'));

function createLiElement(text) {
  let liEl = document.createElement('li');
  liEl.classList.add(
    'list-group-item',
    'list-group-item-action',
    'list-group-item-primary',
    'd-flex',
    'justify-content-between',
    'align-items-center'
  );
  liEl.innerHTML = `<span>${text}</span><button type="button" class="btn-close closeButton" aria-label="Close">`;
  return liEl;
}

function addClicked() {
  let inputValue = inputDOM.value.trim();
  if (inputValue == '') {
    let toastElement = new bootstrap.Toast(toastFailDOM, { animation: true, delay: 4000 });
    toastElement.show();
  } else {
    ulDOM.appendChild(createLiElement(inputValue));
    todoList.push({ txt: inputValue, isChecked: false });
    localStorage.setItem('toDo', JSON.stringify(todoList));
    let toastElement = new bootstrap.Toast(toastSuccessDOM, { animation: true, delay: 4000 });
    toastElement.show();
  }
  inputDOM.value = '';
}

function ulClicked(event) {
  let el = event.target.closest('li');
  let index = Array.from(el.parentNode.children).indexOf(el);
  if (event.target.tagName === 'BUTTON') {
    // remove todo
    todoList.splice(index, 1);
    ulDOM.removeChild(el);
  } else {
    todoList[index].isChecked = !todoList[index].isChecked;
    el.classList.toggle('bg-secondary');
    el.classList.toggle('text-decoration-line-through');
  }
  localStorage.setItem('toDo', JSON.stringify(todoList));
}

// start localStorage
if (!todoList) {
  todoList = [];
} else {
  // append todo items
  todoList.forEach((todo) => {
    let liTodo = createLiElement(todo.txt);
    if (todo.isChecked) toggleCheck(liTodo);
    ulDOM.appendChild(liTodo);
  });
}

ulDOM.addEventListener('click', ulClicked);
inputDOM.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    addClicked();
  }
});
liveToastBtn.addEventListener('click', addClicked);
