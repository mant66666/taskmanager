import { loadTasks } from "./addItem";
export function editDeleteTasks(event){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    document.querySelectorAll(".edit").forEach(btn => {
        btn.addEventListener("click", (event) => {
            alert("This feature is coming soon – development in progress")
    })});
    document.querySelectorAll(".delete").forEach(btn => {
        btn.addEventListener("click", (event) => {
            let task=btn.closest(".table__tasks-item");
            let idTask=task.getAttribute("data-id");
            tasks=tasks.filter(task => task.id!=idTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
            
    })
})
}