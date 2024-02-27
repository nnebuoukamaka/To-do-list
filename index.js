// const todo = documemnt.getElementById("todo");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");

    todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newTask = todoInput.value;
    if(newTask === "")
    {
        alert("Please enter a task!");
        return;
    }
    addTask(newTask);
    todoInput.value= "";
    });

    document.addEventListener('DOMContentLoaded', function() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => {
            addTask(task.text);
        });
      });
    
function addTask (task) {
    const listItem = document.createElement('li');

    const taskText = document.createElement('span');
    taskText.textContent = task;
    listItem.appendChild(taskText);

    const editButton = document.createElement('button');
    editButton.textContent = 'edit';
    listItem.appendChild(editButton);

    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'delete';
    listItem.appendChild(deleteButton);

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    listItem.appendChild(checkBox);

    todoList.appendChild(listItem);

    checkBox.addEventListener('change', function(){
        if(this.checked)
        {
            taskText.style.textDecoration = 'line-through';
        }
        else{
            taskText.style.textDecoration ='none';  
        }
    });

    deleteButton.addEventListener('click', function(){
        todoList.removeChild(listItem);
    });
   

    editButton.addEventListener('click', function(){
        const isEditing = listItem.classList.contains('editing');
        
        if(isEditing)
        //Here it is in edit mode, we want to switch to read mode
        {
            taskText.textContent = this.previousSibling.value;
            listItem.classList.remove('editing');
            editButton.textContent = 'edit';
        }
        else{
            //Here it is in read mode, we want to change it to edit mode
            const input = document.createElement('input');
            input.type = 'text';
            input.value = taskText.textContent;
            listItem.insertBefore(input, taskText);
            listItem.removeChild(taskText);
            listItem.classList.add('editing');
            editButton.textContent = 'Save'
        }
        saveTasksToLocalStorage();
    });


}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(task => {
        const taskText = task.querySelector('span').textContent;
        const isCompleted = task.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }  


