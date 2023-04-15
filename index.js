const dom = document;
const input = dom.querySelector(".task-name-input input");
const taskBox = dom.querySelector(".task-box");
let TODOS = JSON.parse(window.localStorage.getItem("todoList"));

let todoIdToEdited;
let isEdited = false;

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

const showTodos = ({ filter }) => {
  let li = "";
  if (TODOS) {
    TODOS.forEach(({ nameTodo, status }, id) => {
      let isCompleted = status === "completed" ? "checked" : "";
      // console.log(filter);
      if (filter === status || filter === "all") {
        li += `
                  <li class="task">
                  <label for="${id}">
                      <input class="todo-selected" ${isCompleted} type="checkbox" id="${id}" />
                      <p class="${isCompleted}">${nameTodo}</p>
                  </label>
                  <div class="settings">
                      <i class="fa-solid fa-ellipsis"></i>
                      <ul class="task-menu">
                      <li onclick="editTodo(${id}, '${nameTodo}')"><i class="fa-solid fa-pencil"></i> Edit</li>
                      <li onclick="deleteTodo(${id})"><i class="fa-solid fa-trash"></i> Delete</li>
                      </ul>
                  </div>
                  </li>
              
              `;
      }
    });
  }
  taskBox.innerHTML = li || `<span>You don't have any task here</span>`;
};

showTodos({ filter: "all" });

const filterTodos = (btn) => {
  document.querySelector(".filters span.active").classList.remove("active");
  btn.classList.add("active");
  showTodos({ filter: btn.id });
};

const deleteTodo = (todoId) => {
  TODOS.splice(todoId, 1);
  localStorage.setItem("todoList", JSON.stringify(TODOS));
  showTodos({filter: "all"});
};

const editTodo = (todoId, nameTodo) => {
  isEdited = true;
  todoIdToEdited = todoId;
  input.value = nameTodo;
};

const clickHandler = ({ target }) => {
  if (target.matches(".todo-selected")) updateTodoStatus(target);
  if (target.matches(".settings i")) showMenu(target);
  if (target.matches(".filters span")) filterTodos(target);
};

const keyUpHandler = (event) => {
  const taskName = input.value.trim();

  if (event.key === "Enter" && taskName) {
    if (!isEdited) {
      if (!TODOS) {
        TODOS = [];
      }
      let taskInfo = { nameTodo: taskName, status: "pending" };
      TODOS.push(taskInfo);
    } else {
      isEdited = false;
      TODOS[todoIdToEdited].nameTodo = taskName;
    }
    localStorage.setItem("todoList", JSON.stringify(TODOS));
    input.value = "";
    showTodos({ filter: "all" });
  }
};

const load = () => {
  dom.addEventListener("click", clickHandler);
  dom.addEventListener("keyup", keyUpHandler);
};

dom.addEventListener("DOMContentLoaded", load);
