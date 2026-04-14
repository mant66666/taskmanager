import  {AddList}  from '@js/addItem.js';
import { loadTasks } from '@js/addItem.js';
import  {filterEvents}  from '@js/filterEvents.js';
import  {editDeleteTasks}  from '@js/editDeleteTasks.js';
import '@assets/styles/main.scss';
document.addEventListener("DOMContentLoaded", () => {
    AddList();    
    filterEvents();
    editDeleteTasks(); 
    const filter = localStorage.getItem("filter")? localStorage.getItem("filter"):"";
    if (filter === "completed") {
        loadTasks("completed", true);
    } else if (filter === "active") {
        loadTasks("completed", false);
    } else {
        loadTasks();
    }
});
window.addEventListener('storage', () => {
    const filter = new URL(window.location.href).searchParams.get("filter");
    if (filter === "completed") {
        loadTasks("completed", true);
    } else if (filter === "active") {
        loadTasks("completed", false);
    } else {
        loadTasks();
    }
    window.location.reload();
});


