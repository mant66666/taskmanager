import { useEffect, useState } from 'react';
    
export default function Modal(props){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function OnClose(event) {
        event.preventDefault();
        props.setIsModalOpen(false);
        setTitle('');
        setDescription('');
        props.addTask(title,description);
    }
    
    return(
                <div
                        className="task-form-overlay"
                        style={{ display: 'flex' }}
                        onClick={(event) => {
                            if (event.target === event.currentTarget) {
                                OnClose();
                            }
                        }}
                    >
                        <form className="task-form" onSubmit={OnClose}>
                            <div className="task-form__header">
                                <h3 className="task-form__title">Добавить задачу</h3>
                                <button
                                    type="button"
                                    className="task-form__close"
                                    onClick={OnClose}
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