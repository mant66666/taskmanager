import { useEffect, useState } from 'react';
import Executors from '../Executors/Executors';
    
export default function Modal(props){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [chosenExecutors, setChosenExecutors] = useState([]);

    function closeModal() {
        props.setIsModalOpen(false);
        props.setTaskToEdit(null);
        setTitle('');
        setDescription('');
        setChosenExecutors([]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        if (!title.trim() && !description.trim()) {
            return;
        }
        
        if(props.taskToEdit){
            props.editTask(props.taskToEdit.id, title, description,chosenExecutors);
        }
        else{
            const taskAdded = props.addTask(title, description, chosenExecutors);

            if (!taskAdded) {
                return;
            }
        }

        closeModal();
    }
    


    useEffect(() => {
        if(props.taskToEdit) {
            setTitle(props.taskToEdit.title);
            setDescription(props.taskToEdit.text);
            setChosenExecutors(props.taskToEdit.executors || []);
        } else {
            setTitle('');
            setDescription('');
            setChosenExecutors([]);
        }
    }, [props.taskToEdit]);



    return(
                <div
                        className="task-form-overlay"
                        style={{ display: 'flex' }}
                        onClick={(event) => {
                            if (event.target === event.currentTarget) {
                                closeModal();
                            }
                        }}
                    >
                        <form className="task-form" onSubmit={handleSubmit}>
                            <div className="task-form__header">
                                <div>
                                    <p className="task-form__eyebrow">
                                        {props.taskToEdit ? 'Редактирование' : 'Новая запись'}
                                    </p>
                                    <h3 className="task-form__title">
                                        {props.taskToEdit ? 'Изменить задачу' : 'Добавить задачу'}
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    className="task-form__close"
                                    onClick={closeModal}
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="task-form__body">
                                <div className="task-form__group">
                                    <label className="task-form__label" htmlFor="task-name">
                                        Название задачи
                                    </label>
                                    <input
                                        id="task-name"
                                        type="text"
                                        className="task-form__input"
                                        placeholder="Введите название"
                                        value={title}
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                </div>

                                <div className="task-form__group">
                                    <label className="task-form__label" htmlFor="task-desc">
                                        Описание
                                    </label>
                                    <textarea
                                        id="task-desc"
                                        className="task-form__textarea"
                                        placeholder="Введите описание"
                                        rows="4"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                </div>

                                <Executors
                                    users={props.users}
                                    chosenExecutors={chosenExecutors}
                                    setChosenExecutors={setChosenExecutors}
                                />
                            </div>

                            <div className="task-form__footer">
                                <button
                                    type="submit"
                                    className="task-form__btn task-form__btn--submit"
                                >
                                    Сохранить
                                </button>
                            </div>
                        </form>
                    </div>
    )
}
