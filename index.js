const dom = document;
let TODOS = JSON.parse(window.localStorage.getItem("todoList"));
const taskBox = dom.querySelector(".task-box");

const updateTodoStatus = (selectedTodo) => {
  const todoName = selectedTodo.parentElement.lastElementChild;
  if (selectedTodo.checked) {
    todoName.classList.add("checked");
    TODOS[selectedTodo.id].status = "completed";
  } else {
    todoName.classList.remove("checked");
    TODOS[selectedTodo.id].status = "pending";
  }
  localStorage.setItem("todoList", JSON.stringify(TODOS));
};

const showMenu = (selectedTodo) => {
  let todoMenu = selectedTodo.parentElement.lastElementChild;
  todoMenu.classList.add("show");
  document.onclick = ({ target }) => {
    if (target.tagName !== "I" || target !== selectedTodo) {
      todoMenu.classList.remove("show");
    }
  };
};

const clickHandler = ({ target }) => {
  if (target.matches(".todo-selected")) updateTodoStatus(target);
  if (target.matches(".settings i")) showMenu(target);
};

const showTodos = () => {
  let li = "";

  if (TODOS) {
    TODOS.forEach(({ nameTodo, status }, id) => {
      let isCompleted = status === "completed" ? "checked" : "";
      // console.log(id, nameTodo, status);
      li += `
                <li class="task">
                <label for="${id}">
                    <input class="todo-selected" ${isCompleted} type="checkbox" id="${id}" />
                    <p class="${isCompleted}">${nameTodo}</p>
                </label>
                <div class="settings">
                    <i class="fa-solid fa-ellipsis"></i>
                    <ul class="task-menu">
                    <li><i class="fa-solid fa-pencil"></i> Edit</li>
                    <li><i class="fa-solid fa-trash"></i> Delete</li>
                    </ul>
                </div>
                </li>
            
            `;
    });
  }
  taskBox.innerHTML = li;
};

showTodos();

const keyUpHandler = (event) => {
  const taskName = dom.querySelector(".task-name-input input").value.trim();
  // console.log(taskName);

  if (event.key === "Enter" && taskName) {
    let TODOS = JSON.parse(window.localStorage.getItem("todoList"));
    if (!TODOS) {
      TODOS = [];
    }
    let taskInfo = { nameTodo: taskName, status: "pending" };
    TODOS.push(taskInfo);
    localStorage.setItem("todoList", JSON.stringify(TODOS));
    console.log(TODOS);
  }
};

const load = () => {
  dom.addEventListener("click", clickHandler);
  dom.addEventListener("keyup", keyUpHandler);
};

dom.addEventListener("DOMContentLoaded", load);
