//selectors
 const textInput = document.getElementById('text-input');
 const addButton = document.getElementById('add-button');
 const prioritySelector = document.getElementById('priority-selector');

let todos = [];
try {
  todos = JSON.parse(window.localStorage.getItem("todos"));
  console.log(todos);
  
  //if todos is not empty, make a loop that adds the todos to the ul
  if (todos.length > 0) {
    let initialView = document.getElementById("view");
    //loop for each todo in todos
    for (todo of todos){
      let todoContainer = document.createElement("div");
      todoContainer.className = "todo-container";
      let todoPriority = document.createElement("div");
      todoPriority.className ="todo-priority";
      todoPriority.innerHTML = "Priority: " + todo.priority;
      let todoCreatedAt = document.createElement("div");
      todoCreatedAt.className = "todo-created-at";
      todoCreatedAt.innerHTML = formatDate(todo.date);
      let todoText = document.createElement("div");
      todoText.className = "todo-text";
      todoText.innerHTML = todo.text;
      todoContainer.append(todoPriority, todoText, todoCreatedAt);
      
      initialView.append(todoContainer);
    }
    

  }
  //todoPriority.innerHTML = "Priority: " + todo.priority;

} catch (error) {
  
}
//event listeners
addButton.addEventListener('click', addTodo);

////////////////finished loading page

// function
function addTodo(event){

  //prevent form from submitting
  event.preventDefault();

  //get task value
  let text = textInput.value;
  let priority = prioritySelector.value;
  let taskDate = new Date();

  //save todo as a JSON object in todos[]
  todos.push({ 
    "text": text,
    "priority": priority,
    "date": taskDate
  });
  //save todos on local storage
  window.localStorage.setItem("todos", JSON.stringify(todos));

  //save todos to JSONBIN

  //create html elements, add to view section
  let todoContainer = document.createElement("div");
  todoContainer.className = "todo-container";
  let todoPriority = document.createElement("div");
  todoPriority.className ="todo-priority";
  todoPriority.innerHTML = "Priority: " + priority;
  let todoCreatedAt = document.createElement("div");
  todoCreatedAt.className = "todo-created-at";
  todoCreatedAt.innerHTML = formatDate(taskDate);
  let todoText = document.createElement("div");
  todoText.className = "todo-text";
  todoText.innerHTML = text;
  todoContainer.append(todoPriority, todoText, todoCreatedAt);
  let view = document.getElementById("view");
  view.append(todoContainer);

  //todo DIV
  const todoDIV = document.createElement('div');
  todoDIV.classList.add('todo');
  // create LI
  const newTodo = document.createElement('li');
  newTodo.classList.add('todo');

  //reset input
  textInput.value = "";

}

function formatDate(date) {
  let d = new Date(date),
      minutes = '' + (d.getMinutes()),
      hours = '' + (d.getHours()),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (minutes.length < 2) 
      minutes = '0' + minutes;
  if (hours.length < 2) 
      hours = '0' + hours;
  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-') + ' ' + [hours, minutes].join(':');
}