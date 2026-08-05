import { useDispatch } from 'react-redux';
import { deleteTaskThunk, editTaskThunk } from "../../store/tasksSlice";
export default function Task(props){
    const dispatch = useDispatch();
    const user=props.user;
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
            onChange={() => dispatch(editTaskThunk({id: props.taskData.id, completed: !props.taskData.completed}))}
            />

            {user.role === "founder" &&(
                <button
                type="button"
                className="table__tasks-item_edit"
                onClick={() => props.openModal(props.taskData)}
                >
                🖊️
                </button>
            )}
            {user.role === "founder" &&(
                <button
                type="button"
                className="table__tasks-item_edit"
                onClick={() => dispatch(deleteTaskThunk({id: props.taskData.id}))}
                >
                    🗑️
                </button>
            )}
        </div>
    )
}
