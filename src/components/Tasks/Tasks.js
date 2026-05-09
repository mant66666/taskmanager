import Task from "./Task"
export function Tasks(props){
    let FilteredTasks=props.tasks.filter((task) => {
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
                            <Task key={task.id} id={task.id} title={task.title} text={task.text} completed={task.completed} toggleTask={props.toggleTask} tasks={props.tasks} setTasks={props.setTasks}/>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="table__tasks_add"
                        onClick={props.openModal}
                    >
                        +
                    </button>
                </div>
    )
}