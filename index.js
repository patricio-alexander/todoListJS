const dom = document;
const taskBox = dom.querySelector(".task-box");
let TODOS = JSON.parse(window.localStorage.getItem("todoList"));


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
                    <li onclick="deleteTodo(${id})"><i class="fa-solid fa-trash"></i> Delete</li>
                    </ul>
                </div>
                </li>
            
            `;
    });
  }
  taskBox.innerHTML = li;
};

showTodos();


const deleteTodo = (todoId) => {
  TODOS.splice(todoId, 1);
  localStorage.setItem("todoList", JSON.stringify(TODOS));
  showTodos();
}


const keyUpHandler = (event) => {
  const input = dom.querySelector(".task-name-input input")
  const taskName = input.value.trim();

  if (event.key === "Enter" && taskName) {
    if (!TODOS) {
      TODOS = [];
    }
    let taskInfo = { nameTodo: taskName, status: "pending" };
    TODOS.push(taskInfo);
    localStorage.setItem("todoList", JSON.stringify(TODOS));
    input.value = "";
    showTodos();
  }
};

const load = () => {
  dom.addEventListener("click", clickHandler);
  dom.addEventListener("keyup", keyUpHandler);
};

dom.addEventListener("DOMContentLoaded", load);
