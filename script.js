const todoInput =document.querySelector('.todo-input')
const todoButton =document.querySelector('.todo-button')
const todoList =document.querySelector('.todo-list')
const saveTaskButton= document.getElementById('SaveToDo');
let toDos =[]
todoButton.addEventListener('click',addTodo)
document.addEventListener('DOMContentLoaded', getToDoListOnLoaded) 
todoList.addEventListener('click', handelDeleteOrEdit);
function addTodo(e){
    e.preventDefault();
    if (todoInput.value != "") {
    let todoDiv =document.createElement('div')
    let newLi = `
        <li>${todoInput.value}</li>
        <i class="fa-solid fa-trash-can"></i>
        <i class="fa-solid fa-square-pen"></i>`;
        todoDiv.innerHTML= newLi;
        todoList.appendChild(todoDiv)
        todoDiv.classList.add('todo-item')
    saveToLocalStorage(todoInput.value)
  }
    todoInput.value=""

}
 function saveToLocalStorage(todo){
     if(localStorage.getItem('toDos')===null){
             toDos=[]
     }
     else{
        toDos= JSON.parse(localStorage.getItem('toDos'))
     }
     toDos.push(todo)
     localStorage.setItem('toDos',JSON.stringify(toDos))
 }
function getToDoListOnLoaded(){
    toDos = JSON.parse(localStorage.getItem('toDos'));

    toDos.forEach(todo => {
      let todoDiv= document.createElement('div')
    let newLi = `
      <li>${todo}</li>
      <i class="fa-solid fa-trash-can"></i>
      <i class="fa-solid fa-square-pen"></i>    `;
    todoDiv.innerHTML= newLi;
    todoList.appendChild(todoDiv)
    todoDiv.classList.add('todo-item')
  });
  }
  function handelDeleteOrEdit(e){
    if(e.target.classList.contains('fa-trash-can'))
    deleteTodo(e);
    if(e.target.classList.contains("fa-square-pen"))
    editTodo(e);
  }
  function deleteTodo(e){
     let element = e.target.parentNode;
     let array=JSON.parse(localStorage.getItem('toDos')) 
     let itemDelete=array.indexOf(element.innerText)
     array.splice(itemDelete, 1)
     localStorage.setItem('toDos', JSON.stringify(array))
     element.remove();
  }
  function editTodo(e){
    let element = e.target.parentNode;
    let elements=JSON.parse(localStorage.getItem('toDos'))
    let elementEdit=elements.indexOf(element.innerText) 
    saveTaskButton.value=elementEdit; 
    todoInput.value=elements[elementEdit] 
  }
  saveTaskButton.addEventListener('click', function(){
    let elements=JSON.parse(localStorage.getItem('toDos'))
    elements[saveTaskButton.value]= todoInput.value; 
    localStorage.setItem('toDos', JSON.stringify(elements))
  })
  