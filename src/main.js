  
//selectors
const textInput = document.getElementById('text-input');
const addButton = document.getElementById('add-button');
const prioritySelector = document.getElementById('priority-selector');
const SECRET_KEY = "I Want To Pass Pre Course";
const X_COLLECTION_NAME = "my-todo";
const X_COLLECTION_ID = "6015af9413b20d48e8bf2d47";
const X_MASTER_KEY = "$2b$10$WrOeApHlZUPC6t5.IY0qO.YFqEWeEi8VijgcZ2TvsbxSCmFasE2u2";
let counter = 1;
let todos = [];
const sortDate = document.getElementById("sort-date");
const sortPriority = document.getElementById("sort-button");


console.log("todos = " + todos);
  try {
    todos = JSON.parse(window.localStorage.getItem("my-todo"));
    loadTodos();
    } catch (error) {
      console.log(error);
      todos = [];
  }

console.log('todos contains: '+ JSON.stringify(todos));

//event listeners
addButton.addEventListener('click', addTodo);
sortDate.addEventListener('click', sortByDate);
sortPriority.addEventListener('click', sortByPriority);

///////////////////////////////////////////////////////////////////finished loading page

// function
function addTodo(event){

 //prevent form from submitting
event.preventDefault();

 //get task value
 /////////////////////////////////////////////////////////////check that text isnt empty
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
 window.localStorage.setItem("my-todo", JSON.stringify(todos));

 //save todos to JSONBIN
 saveToJSONBIN(todos[todos.length - 1]);

 //create html elements, add to view section
 let todoContainer = document.createElement("div");
 todoContainer.className = "todo-container";
 let todoPriority = document.createElement("div");
 todoPriority.className ="todo-priority";
 todoPriority.innerHTML = priority;
 let todoCreatedAt = document.createElement("div");
 todoCreatedAt.className = "todo-created-at";
 todoCreatedAt.innerHTML = formatDate(taskDate);
 let todoText = document.createElement("div");
 todoText.className = "todo-text";
 todoText.innerHTML = text;
 todoContainer.append(todoPriority, todoText, todoCreatedAt);
 let li =document.createElement("li");
 li.append(todoContainer);
 let list = document.getElementById("list");
 list.append(li);
 document.getElementById("counter").innerHTML = counter++;

 //todo DIV
 const todoDIV = document.createElement('div');
 todoDIV.classList.add('todo');
 // create LI
 const newTodo = document.createElement('li');
 newTodo.classList.add('todo');

 //reset input
 textInput.value = "";

}

//formating date from millisecond to a readable date
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
};

async function saveToJSONBIN(data){
  let req = new XMLHttpRequest();

  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      console.log(req.responseText);
    }
  };
  
console.log('data = ' + JSON.stringify(data));

  req.open("POST", "https://api.jsonbin.io/v3/b", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", X_MASTER_KEY);
  req.setRequestHeader("X-Collection-Name", X_COLLECTION_NAME);
  req.setRequestHeader("X-Collection-Id", X_COLLECTION_ID);
  req.send(JSON.stringify(data));
};

//get data from jsonbin
async function getDataFromJSONBIN() {
  let req = new XMLHttpRequest();
  
  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      console.log(req.responseText);
      return req.responseText;
    }
  };
  
  req.open("GET", "https://api.jsonbin.io/v3/c/" + X_COLLECTION_ID + "/bins/1", true); 
  req.setRequestHeader("X-Master-Key", X_MASTER_KEY);
  req.send();
};

function loadTodos() {
  //if todos is not empty, make a loop that adds the todos to the view section
  if (todos.length > 0) {
    let initialList = document.getElementById("list");
    //loop for each todo in todos
    for (todo of todos){
      let todoContainer = document.createElement("div");
      todoContainer.className = "todo-container";
      let todoPriority = document.createElement("div");
      todoPriority.className ="todo-priority";
      todoPriority.innerHTML = todo.priority;
      let todoCreatedAt = document.createElement("div");
      todoCreatedAt.className = "todo-created-at";
      todoCreatedAt.innerHTML = formatDate(todo.date);
      let todoText = document.createElement("div");
      todoText.className = "todo-text";
      todoText.innerHTML = todo.text;
      todoContainer.append( todoCreatedAt, todoPriority, todoText);
      let li = document.createElement("li")
      li.append(todoContainer);
      initialList.append(li);
      document.getElementById("counter").innerHTML = counter++;
    }
  }
};

// Add a "checked" symbol when clicking on a list item
let taskList = document.querySelector('UL');
taskList.addEventListener("click", function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle("checked");
  }
}, false);


//creating dark mode
function darkModeToggle() {
  let element = document.body;
  element.classList.toggle("dark-mode");
  let button = document.getElementById("darkMode");
  console.log("button value = " + button.innerText);
  if (button.innerText === "dark mode") {
    button.innerText = "light mode";
  }
  else (button.innerText = "dark mode")
}

//creating a sort button
//date
function sortByDate(){
  console.log("in sort by date");
  todos.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
    });

  console.log("todos = " + JSON.stringify(todos));
  let ul = document.getElementById("list");
  ul.innerHTML='';
  counter = 1;
  loadTodos();
};
//priority number
function sortByPriority(){
  console.log("in sort by priority");
  todos.sort(function (a, b) {
    return b.priority - a.priority;    
  });
  console.log("todos = " + JSON.stringify(todos));
  let ul = document.getElementById("list");
  ul.innerHTML='';
  counter = 1;
  loadTodos();
};

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

