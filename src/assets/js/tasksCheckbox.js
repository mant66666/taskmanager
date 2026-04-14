import { loadTasks } from "./addItem";

export function tasksCheckbox(event){
    let value = event.target.checked;
    console.log(value);
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let taskNode = event.target.closest('.table__tasks-item');
    if (!taskNode) return;

    let task_id = taskNode.getAttribute('data-id')
        ? parseInt(taskNode.getAttribute('data-id'))
        : 0;

    for (let index = 0; index < tasks.length; index++) {
        if(tasks[index].id === task_id) {
            tasks[index].completed = value;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks("completed",localStorage.getItem("filter"));
            window.location.reload();
        }            
    }
    
}