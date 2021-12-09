// tum elementleri secme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();


function eventListeners(){ // tum event listenerlar
form.addEventListener("submit",addTodo);
document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
secondCardBody.addEventListener("click",deleteTodo);
filter.addEventListener("keyup",filterTodos);
clearButton.addEventListener("click",clearAllTodos);

}
function clearAllTodos(e){
// arayuzden temizleme

if(confirm("tumunu silmek istediginize emin misiniz?")){
    //todoList.innerHTML = ""; //yavas

    while(todoList.firstElementChild != null){
        todoList.removeChild(todoList.firstElementChild);
        localStorage.removeItem("todos");
    }
}



}
function filterTodos(e){
const filterValue = e.target.value.toLowerCase();
const listItems = document.querySelectorAll(".list-group-item");

listItems.forEach(function(listItem){
const text = listItem.textContent.toLowerCase();
if(text.indexOf(filterValue) === -1){
    //bulamadi
    listItem.setAttribute("style","display : none !important");
}else {
    listItem.setAttribute("style","display : block");
}

})




}
function deleteTodo(e){

 if(e.target.className === "fa fa-remove"){
     e.target.parentElement.parentElement.remove();
     deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
     showAlert("success","todo basasiyla silindi..");
 }

}
function deleteTodoFromStorage(deletetodo){
let todos = getTodosFromStorage();

todos.forEach(function(todo,index){

    if(todo === deletetodo){
     todos.splice(index,1); // arrayden silme splice silme metodu arrayden
    }

})

localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
let todos = getTodosFromStorage();

todos.forEach(function(todo){
    addTodoToUI(todo);

})

}



//todo ekleme
function addTodo(e){
const listItem = document.querySelectorAll(".list-group-item");
const newTodo = todoInput.value.trim();

if(newTodo === listItem.firstElement){
    showAlert("warning","Ayni todo girilemez")
}

if(newTodo === ""){
    showAlert("danger","lutfen bir todo girin..");
}else{
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success","todo basariyla eklendi.")
}

    
    
e.preventDefault();

}
function getTodosFromStorage(){
    let todos;
    
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage (newTodo){
let todos = getTodosFromStorage();

todos.push(newTodo);

localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type,message){

    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    
    //setTimeout
    setTimeout(function(){
        alert.remove();
    },1500);

}
function addTodoToUI(newTodo){ // string degerini list item olarak ekleyecek

    /* <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li> */
 // list item olusturma
 const listItem = document.createElement("li");
  // link olusturma 
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>"

  listItem.className = "list-group-item d-flex justify-content-between";

  //text-node ekleme

  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  //todoListe listItemi ekleme
  todoList.appendChild(listItem);
  todoInput.value = "";

  

}