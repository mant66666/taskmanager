import Task from "./Task"
export function Tasks(props){

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

    let FilteredTasks = props.tasks.filter((task) => {
            if (props.filter === 'completed') {
                return task.completed;
            }
    
            if (props.filter === 'active') {
                return !task.completed;
            }
    
            return true;
        });
    return (
                <div className="table__tasks-panel">
                    <div className="table__tasks">
                        {FilteredTasks.length === 0 && (
                            <div
                                className="table__tasks-item"
                                style={{
                                    gridTemplateColumns: '1fr',
                                    textAlign: 'center',
                                    color: '#6b6d80',
                                }}
                            >
                                <p className="table__tasks-item_text">
                                    Задач пока нет. Добавь первую и поехали.
                                </p>
                            </div>
                        )}

                        {FilteredTasks.map((task) => (
                            <Task key={task.id} taskData={task} toggleTask={toggleTask} deleteTask={deleteTask} openModal={props.openModal} executors={props} />
                        ))}
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
