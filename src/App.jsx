import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/Sidebars/Sidebar';
import { Filters } from './components/Filters/Filters';
import { Tasks } from './components/Tasks/Tasks';
import Analytics from './components/Analytics/Analytics';
import Modal from './components/Modals/Modal';

import Authorization from './components/Authorization/Authorization';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/userSlice';

import { fetchUsersThunk } from "./store/usersSlice";
import { fetchUserThunk } from "./store/userSlice";

import { createTaskThunk, fetchTasksThunk, editTaskThunk } from './store/tasksSlice';
function getSavedFilter() {
    return localStorage.getItem('filter') || '';
}

export default function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    
    
    const users = useSelector((state) => state.users.items);
    const tasks = useSelector((state) => state.tasks.items);

    const [filter, setFilter] = useState(getSavedFilter);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    useEffect(() => {
        dispatch(fetchUserThunk());
    }, []);

    useEffect(() => { 
        if (!user) {
            return;
        };
        dispatch(fetchUsersThunk(user.id));
        dispatch(fetchTasksThunk(user.id));
    }, [user, dispatch]);

    useEffect(() => {
        if (filter) {
            localStorage.setItem('filter', filter);
        } else {
            localStorage.removeItem('filter');
        }
    }, [filter]);

    function openModal(selectedTask) {
        const taskForEditing = selectedTask && selectedTask.id ? selectedTask : null;

        setTaskToEdit(taskForEditing);
        setIsModalOpen(true);
    }

    function addTask(title, description, chosenExecutors) {
        if (!title.trim() && !description.trim()) {
            return false;
        }

        const newTask = {
            id: Date.now(),
            title: title.trim(),
            text: description.trim(),
            completed: false,
            company: user.company,
            creator: {
                name: user.name,
                login: user.login,
            },
            executors: chosenExecutors,
        };

        dispatch(createTaskThunk(newTask));
        setFilter('');

        return true;
    }


    function editTask(id, title, text, executors){
        dispatch(editTaskThunk({id, title, text, executors}));
        setTaskToEdit(null);
    }


    if(user){
        return (
            <>
                <Sidebar />
                
                <Routes>
                    <Route path="/" element={(
                        <main className="main">
                            <header className="header">
                                <span className="header-text">Мои задачи</span>
                            </header>

                            <div className="project-header">
                                <Filters filter={filter} setFilter={setFilter}/>
                            </div>

                            <Tasks tasks={tasks} filter={filter} openModal={openModal} user={user} users={users}/>
                        </main>
                    )} />
                    <Route path="/analytics" element={<Analytics tasks={tasks} />} />
                </Routes>

                {isModalOpen && (
                    <Modal
                        setIsModalOpen={setIsModalOpen}
                        addTask={addTask}
                        taskToEdit={taskToEdit}
                        editTask={editTask}
                        setTaskToEdit={setTaskToEdit}
                        users={users}
                    />
                )}
            </>
        );
    }
    else{
        return (
            <Authorization />
        );
    }
}
