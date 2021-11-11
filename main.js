
let input = document.querySelector(".input");
let btn = document.querySelector(".btn");
let ul = document.querySelector("ul");
let div = document.querySelector(".tasks");

let arrayOfTasks = [];

// [5]
if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
  createElement(arrayOfTasks);
}
// [6]
div.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskFromLocal(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("task")) {
    // fix animation issue
    e.target.classList.contains("done") || e.target.firstChild.style.animation
      ? e.target.firstChild.style.removeProperty("animation")
      : e.target.firstChild.style.setProperty("animation", "bullet 0.1s");

    e.target.classList.toggle("done");
    toggleLocal(e.target.getAttribute("data-id"));
  }
});

// [7]
function deleteTaskFromLocal(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addArrayToLocal(arrayOfTasks);
}
// [8]
function toggleLocal(taskId) {
  for (i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      //== because taskId is a string
      arrayOfTasks[i].condition == true
        ? (arrayOfTasks[i].condition = false)
        : (arrayOfTasks[i].condition = true);
    }
    addArrayToLocal(arrayOfTasks);
  }
}

// [1]
btn.addEventListener("click", () => {
  if (input.value != "") {
    addElementToArry(input.value);
  }
  input.value = "";
});

// [2]
function addElementToArry(inputValue) {
  let task = {
    id: Date.now(),
    title: inputValue,
    condition: false,
  };
  arrayOfTasks.push(task);
  createElement(arrayOfTasks);
}

// [3]
function createElement(arrayOfTasks) {
  ul.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let li = document.createElement("li");
    li.className = "task";
    //[9]
    if (task.condition) {
      li.className = "task done";
    }
    li.setAttribute("data-id", task.id);
    li.innerHTML = `<span></span> ${task.title}`;

    let del = document.createElement("span");
    del.className = "del";
    li.appendChild(del);

    ul.appendChild(li);
  });
  addArrayToLocal(arrayOfTasks);
}

// [4]
function addArrayToLocal(array) {
  window.localStorage.setItem("tasks", JSON.stringify(array));
}
