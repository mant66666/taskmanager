import { loadTasks } from "./addItem";
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}
export function filterEvents(){
    document.querySelectorAll(".filters__checkbox").forEach(checkbox => {
        checkbox.addEventListener("click", (event) => {
            let value = event.target.checked;
            if (value){
                if (checkbox.name == "completed") {
                    localStorage.setItem("filter", "completed");
                    loadTasks("completed", true);
                    setCookie("filter", "completed", 7);
                }
                if (checkbox.name == "active") {
                    loadTasks("completed", false);
                    localStorage.setItem("filter", "active");
                    setCookie("filter", "active", 7);
                }
            } else {
                loadTasks();
                localStorage.removeItem("filter");
                window.history.pushState({}, "", window.location.pathname); 
            } 
        });
    });
    window.addEventListener("popstate", () => {
        const filter = new URL(window.location.href).searchParams.get("filter");
        if (filter=="completed"){
            loadTasks("completed", true);
            localStorage.setItem("filter", "completed");
        }
        if(filter=="active"){
            loadTasks("completed", false);
            localStorage.setItem("filter", "active");
        }
        if(!filter){
            loadTasks();
            localStorage.removeItem("filter");
        } 
    });    
}