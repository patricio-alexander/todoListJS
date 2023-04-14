const dom = document;
// let TODOS = window.localStorage.getItem("todos");

const clickHandler = (event) => {};

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
