document.addEventListener("DOMContentLoaded", () => {
  // your code here
  let form = document.querySelector("#create-task-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let userInput = event.target[0].value;
    let li = document.createElement("li");
    li.innerText = userInput;
    let taskList = document.querySelector("#tasks");
    taskList.appendChild(li);
    form.reset();
  });
});
