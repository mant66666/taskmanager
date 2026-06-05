export default function Task(props){
    const executors = props.taskData.executors || [];
    const executorsText = executors.length
        ? executors.map((executor) => executor.name).join(', ')
        : 'Без исполнителя';
    const creatorName = props.taskData.creator?.name || 'Неизвестно';

    return (
            <div key={props.taskData.id} className="table__tasks-item">
            <h3 className="table__tasks-item_name">{props.taskData.title}</h3>
            <p className="table__tasks-item_text">{props.taskData.text}</p>
            <div className="table__tasks-item_people">
                <p className="table__tasks-item_person">
                    <span className="table__tasks-item_person-label">Создатель задачи:</span>
                    {creatorName}
                </p>
                <p className="table__tasks-item_person">
                    <span className="table__tasks-item_person-label">Исполнители:</span>
                    {executorsText}
                </p>
            </div>

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
                🗑️
            </button>
        </div>
    )
}
