const taskList = document.getElementById("taskList");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(t => createTask(t.text, t.completed));
}

function createTask(text, completed = false) {
  const li = document.createElement("li");
  li.textContent = text;

  if (completed) li.classList.add("done");

  li.onclick = () => {
    li.classList.toggle("done");
    saveTasks();
  };

  const del = document.createElement("span");
  del.textContent = " ❌";
  del.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(del);
  taskList.appendChild(li);
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value) return;

  createTask(input.value);
  saveTasks();
  input.value = "";
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      completed: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

loadTasks();
// ===== THEME TOGGLE WITH LOCALSTORAGE =====
const themeBtn = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
    themeBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "dark");
    themeBtn.textContent = "🌙";
  }
});
// ===== CALCULATOR LOGIC =====
const calcInput = document.getElementById("calcInput");

function press(value) {
  calcInput.value += value;
}

function clearCalc() {
  calcInput.value = "";
}

function calculate() {
  try {
    calcInput.value = eval(calcInput.value);
  } catch (err) {
    calcInput.value = "Error";
  }
}
