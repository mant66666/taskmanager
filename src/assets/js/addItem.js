import { tasksCheckbox } from "./tasksCheckbox";
import  {editDeleteTasks}  from '@js/editDeleteTasks.js';
export function AddList(){
    document.querySelector(".table__tasks_add").addEventListener("click", ()=>{
        document.querySelector(".task-form-overlay").style.display="flex";
        document.querySelector(".task-form__close").addEventListener("click", ()=>{
            document.querySelector(".task-form-overlay").style.display="none";
            document.querySelector(".task-form__input").value="";
            document.querySelector(".task-form__textarea").value="";
        });
        document.querySelector(".task-form__btn--submit").addEventListener("click", ()=>{
            const title = document.querySelector(".task-form__input").value;
            const description = document.querySelector(".task-form__textarea").value;
            document.querySelector(".task-form__input").value="";
            document.querySelector(".task-form__textarea").value="";
            document.querySelector(".task-form-overlay").style.display="none";
            saveTasks(title, description)
            loadTasks();
            
        });
    });
}

function saveTasks(title , text) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0,
        title: title,
        text: text, 
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasks(filter,value) {
    document.querySelector(".table__tasks").innerHTML = '';
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (filter){
        tasks=tasks.filter((task)=> task[filter] === value);
    }
        
    tasks.forEach(task => {
        const newTask = document.createElement("div");
        newTask.className = "table__tasks-item";
        newTask.setAttribute("data-id",task.id);
        newTask.innerHTML = `
            <h3 class="table__tasks-item_name">${task.title}</h3>
            <p class="table__tasks-item_text">${task.text}</p>
            <input type="checkbox" class="table__tasks-item_done">
            <button class="table__tasks-item_edit edit">🖊️</button>
            <button class="table__tasks-item_edit delete">🛒</button>
        `;
        document.querySelector(".table__tasks").appendChild(newTask);
        const checkbox = newTask.querySelector(".table__tasks-item_done");
        checkbox.checked = task.completed || false;
        newTask.querySelector(".table__tasks-item_done").addEventListener("change", tasksCheckbox);
    });
    if (value === true) {
            document.querySelector(".completed").checked = true;
            document.querySelector(".active").checked = false;
            const url = new URL(window.location.href);
            url.searchParams.set("filter", "completed");
            window.history.pushState({}, "", url);
    } else if (value === false) {
            document.querySelector(".active").checked = true;
            document.querySelector(".completed").checked = false;
            const url = new URL(window.location.href);
            url.searchParams.set("filter", "active");
            window.history.pushState({}, "", url);
    } else {
            document.querySelector(".active").checked = false;
            document.querySelector(".completed").checked = false;
            
    };
    editDeleteTasks();
}

