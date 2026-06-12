import Task from "./Task"
import { deleteTask as deleteTaskApi } from '../../api/deleteTask';
import { handleToggleTask as toggleTaskApi } from '../../api/handleToggleTask';
export function Tasks(props){
    const user = JSON.parse(localStorage.getItem("user")) || {};

    async function handleDeleteTask(id) {
        const newTasks = await deleteTaskApi({id});
        props.setTasks(newTasks);
    }
    function deleteTask(id) {
        handleDeleteTask(id);
    } 

    async function toggleTask(id) {
        const task = props.tasks.find((task) => task.id === id);
        const newTasks = await toggleTaskApi({
            id,
            completed: !task.completed,
        });
        props.setTasks(newTasks);
    }

    const filteredTasks = props.tasks.filter((task) => {
            if (props.filter === 'completed') {
                return task.completed;
            }
    
            if (props.filter === 'active') {
                return !task.completed;
            }
    
            return true;
        });

    const participantTasks = filteredTasks.filter((task) =>
        task.executors?.some((executor) => executor.name === user.name) && task.creator?.name !== user.name
    );

    const createdByMeTasks = filteredTasks.filter((task) =>
        task.creator?.name === user.name
    );


    const hasVisibleTasks = participantTasks.length > 0 || createdByMeTasks.length > 0;

    function renderTaskColumn(title, tasks) {
        if (tasks.length === 0) {
            return null;
        }

        return (
            <section className="table__tasks-column">
                <div className="table__tasks-column-header">
                    <h2 className="table__tasks-column-title">{title}</h2>
                    <span className="table__tasks-column-count">{tasks.length}</span>
                </div>

                {tasks.map((task) => (
                    <Task key={task.id} taskData={task} toggleTask={toggleTask} deleteTask={deleteTask} openModal={props.openModal} executors={props} />
                ))}
            </section>
        );
    }

    return (
                <div className="table__tasks-panel">
                    <div className="table__tasks">
                        {filteredTasks.length === 0 && (
                            <div className="table__tasks-empty table__tasks-empty--wide">
                                <p className="table__tasks-item_text">
                                    Задач пока нет. Добавь первую и поехали.
                                </p>
                            </div>
                        )}

                        {filteredTasks.length > 0 && !hasVisibleTasks && (
                            <div className="table__tasks-empty table__tasks-empty--wide">
                                <p className="table__tasks-item_text">
                                    Для этого пользователя задач пока нет.
                                </p>
                            </div>
                        )}

                        {hasVisibleTasks && (
                            <div className="table__tasks-columns">
                                {renderTaskColumn(
                                    'Я участник',
                                    participantTasks
                                )}

                                {renderTaskColumn(
                                    'Созданы мной',
                                    createdByMeTasks
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        className="table__tasks_add"
                        onClick={() => props.openModal()}
                    >
                        +
                    </button>
                </div>
    )
}
