export default function Task(props){
   
    return (
            <div key={props.taskData.id} className="table__tasks-item">
            <h3 className="table__tasks-item_name">{props.taskData.title}</h3>
            <p className="table__tasks-item_text">{props.taskData.text}</p>

            <input
            type="checkbox"
            className="table__tasks-item_done"
            checked={props.taskData.completed}
            onChange={() => props.toggleTask(props.taskData.id)}
            />

            <button
            type="button"
            className="table__tasks-item_edit"
            onClick={() => props.openModal(props.taskData)}
            >
            🖊️
            </button>

            <button
            type="button"
            className="table__tasks-item_edit"
            onClick={() => props.deleteTask(props.taskData.id)}
            >
                🛒
            </button>
        </div>
    )
}