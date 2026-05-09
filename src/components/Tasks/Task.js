export default function Task(props){
    function deleteTask(id) {
        const newTasks = props.tasks.filter((task) => task.id !== id);
        props.setTasks(newTasks);
    } 
    function toggleTask(id) {
        const newTasks = props.tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    completed: !task.completed,
                };
            }

            return task;
        });

        props.setTasks(newTasks);
    }
    return (
            <div key={props.id} className="table__tasks-item">
            <h3 className="table__tasks-item_name">{props.title}</h3>
            <p className="table__tasks-item_text">{props.text}</p>

            <input
            type="checkbox"
            className="table__tasks-item_done"
            checked={props.completed}
            onChange={() => toggleTask(props.id)}
            />

            <button
            type="button"
            className="table__tasks-item_edit"
            onClick={() => window.alert('Редактирование пока не готово')}
            >
            🖊️
            </button>

            <button
            type="button"
            className="table__tasks-item_edit"
            onClick={() => deleteTask(props.id)}
            >
                🛒
            </button>
        </div>
    )
}