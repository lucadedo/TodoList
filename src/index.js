import _, { functions } from 'lodash';
import './style.css';
import './createTodo';

const localData = localStorage.getItem('ALL') ? JSON.parse(localStorage.getItem('ALL')) : [];
console.log(localData);

var flag = true;



// display all tasks in localstorage
var render = (function displayAllTasks(){   
 for (let i = 0; i < localData.length; i++) {
    displayTask(localData[i]); 
 }
}());



// get form data
const formData = document.getElementById("new-task-form");
formData.addEventListener("submit", getFormData);

function getFormData(e) {
    e.preventDefault();
    
    const form = e.target;
    const titleInputs = form.querySelector('#new-task-input').value; 
    const dateInputs = form.querySelector('#new-date-input').value;
  
    
    const formDataObject = {title: titleInputs,date: dateInputs};
    console.log(formDataObject); // {title: 'buy Milk', date: '2018-07-22'}
   
    localData.push(formDataObject);
    localStorage.setItem("ALL",JSON.stringify(localData));

    displayTask(formDataObject);
    
}

// dispaly tasks
function displayTask(oneTask){
    let tasks = "";
        tasks += `<div class="task">

                        <div id="task-left-side">

                            <p id="task-title">${oneTask.title}</p>
                            <p id="task-date">${oneTask.date}</p>

                        </div>

                        <div id="task-right-side">
                            <input id="checkbox" type="checkbox">
                            <button id="edit" type="button">edit</button>
                            <button id="delete" type="button">delete</button>                            
                        </div>

                   </div>`;
        
    document.querySelector("#tasks").innerHTML += tasks;
    
        
    activateDeleteBtn();
    activateEditBtn();
    
    // activateCancelBtn();
}
    
function activateDeleteBtn() {
    let deleteBtn = document.querySelectorAll('#delete');
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click",() => { deleteTask(i) })
    });
};

function activateEditBtn() {
    
    let editBtn = document.querySelectorAll('#edit');
    editBtn.forEach((eb, i) => {
        eb.addEventListener("click", () => { 
            console.log(eb,i);
            editTask(eb,i)      
        })
    });
};

function deleteTask(i) {  
    if (!flag) {return};
    console.log(i);
    let newLocalData = JSON.parse(localStorage.getItem('ALL')); //get localstorage to obj
    newLocalData.splice(i,1);
    localStorage.setItem("ALL", JSON.stringify(newLocalData));
    location.reload();
}


function editTask(eb,i) {
    
    if (!flag) {return};
    flag = false;
    let deleteBtn = document.querySelectorAll('#delete');
    let checkboxBtn = document.querySelectorAll('#checkbox');
    
    eb.id += " hide";
    deleteBtn[i].id += " hide";
    checkboxBtn[i].id += " hide";

    let localData = JSON.parse(localStorage.getItem('ALL'));
    console.log(localData[i].title);
   
    let editLocation = document.querySelectorAll('#task-left-side');
    console.log(editLocation[i]);
    editLocation[i].innerHTML =` <form id="edit-task-form" action="#">
                                    <input 
                                    type="text" 
                                    name="new-task-input" 
                                    id="new-task-input" 
                                    value="${localData[i].title}" 
                                    />
                                    <button id="save" style="display: none;" type="submit">save</button>
                                    <button id="cancel" style="display: none;" type="button">cancel</button>
                                </form>`;

    let saveBtn = document.getElementById('save');
    let cancelBtn = document.getElementById("cancel");
    saveBtn.style.display = "block";
    cancelBtn.style.display = "block";


    const saveformData = document.getElementById("edit-task-form");
    saveformData.addEventListener("submit", saveButton(i));

    cancelButton();    
}


function saveButton(i) {
    return function(e){
        e.preventDefault();
        // get new input data & store it to new Obj
        const newForm = e.target;
        let newInput = newForm.querySelector("#new-task-input").value;
        console.log(newInput);
        const inputObj = {title: newInput, date: '2015-05-24'};
        console.log(inputObj);
    
        // create new storage obj, store the new input in it and set it back to localstorage
        let newLoca = JSON.parse(localStorage.getItem('ALL'));
        newLoca.splice([i], 1, inputObj);
        console.log(newLoca);
        localStorage.setItem("ALL", JSON.stringify(newLoca));
        location.reload();

    }
   
 
}

function cancelButton() {
    let cancelBtn = document.querySelector("#cancel");
    cancelBtn.addEventListener('click',() =>{location.reload()})
}


