//Define our UI variables

const form  = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//load all event listeners

loadEventListeners();

function loadEventListeners(){
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks)
  
  //Add task event
  form.addEventListener('submit', addTask);

  //remove task event
  taskList.addEventListener('click', removeTask)

  //clear task event
  clearBtn.addEventListener('click', clearTasks)

  //filter tasks
  filter.addEventListener('keyup', filterTasks)

}

//Get tasks from LS
function getTasks(){
  var tasks;
  if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }else{
    tasks = [];
  }

 tasks.forEach(function(task){
    //Create li element 
    const li = document.createElement('li')
    //add class
    li.className = 'collection-item'; //because of Materialize
    //create text node AND APPEND
    li.appendChild(document.createTextNode(task));

    //create link element
    const link = document.createElement('a');

    //add class
    link.className = 'delete-item secondary-content'
    //add icon html
    link.innerHTML ='<i class="fa fa-remove"></i>';
    //apend the link to the li

    li.appendChild(link);

    taskList.appendChild(li);
 }
 )}


//Add Task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
  }else if(taskInput.value !==''){
      //Create li element 
    const li = document.createElement('li')
    //add class
    li.className = 'collection-item'; //because of Materialize
    //create text node AND APPEND
    li.appendChild(document.createTextNode(`${new Date().toDateString().slice(0,15)} - ${taskInput.value}`));

    //create link element
    const link = document.createElement('a');

    //add class
    link.className = 'delete-item secondary-content'
    //add icon html
    link.innerHTML ='<i class="fa fa-remove"></i>';
    //apend the link to the li

    li.appendChild(link);

    taskList.appendChild(li);

    //store in LOCAL STORAGE
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';
  }

  


 e.preventDefault();
 

}
//store in LS

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }else{
    tasks = [];
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks))

}

//remove task

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
      if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();

      //remove from LS 
      removeTaskFromLocalStorage(e.target.parentElement.parentElement); 
      }
     
    }
}

//remove task from LS

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }else{
    tasks = [];
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task)
    tasks.splice(index, 1);
  })
  localStorage.setItem('tasks',JSON.stringify(tasks))

}

//clear tasks
function clearTasks(e){
  taskList.innerHTML = '';
   e.preventDefault();

   //clear from LS
   clearTasksFromLocalStorage();
}
 
 //clear from LS
 function clearTasksFromLocalStorage(){
   localStorage.clear()
 }


//filter TASKS

function filterTasks(e){
  //what we write in the FILTER field turned to LowerCase
  const text = e.target.value.toLowerCase();
  
  //select all the tasks and loop through them
  document.querySelectorAll('.collection-item').forEach(function(task){
    //select the first child of each task,meaning the NodeText and get the textContent from it
    const item = task.firstChild.textContent;
    
    /*we check if the text content of the Nodetext
     for each task is included in the text that we wrote in the filter input*/
    if(item.toLowerCase().indexOf(text) != -1){
      //if it is then keep the task visible,it was before anyway
      task.style.display = 'block';
    }else{
      //if not hide it.
      task.style.display = 'none';
    }
  });

}

