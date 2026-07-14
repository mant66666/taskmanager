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

import { getTasks} from "./api/getTasks";
import { createTask } from "./api/createTask";
import { getUsers} from "./api/getUsers";
import { updateTask } from './api/updateTask';

function getSavedFilter() {
    return localStorage.getItem('filter') || '';
}

export default function App() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    
    const [users, setUsers] = useState([]);

    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState(getSavedFilter);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    useEffect(() => {
        getUsers().then((data) => {
            setUsers(data);
        });
    }, []);
    useEffect(() => {
        getTasks().then((data) => {
            setTasks(data);
        });
    }, []);

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

    async function handleCreateTask(task) {
        const newTask = await createTask(task);
        setTasks((prevTasks) => [...prevTasks, newTask]);
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
            creator: user ? {
                name: user .name,
                login: user .login,
            } : null,
            executors: chosenExecutors,
        };

        setFilter('');
        handleCreateTask(newTask);
        
        return true;
        
    }

    async function handleEditTask(task) {
        const editedTasks = await updateTask(task);
        setTasks(() => editedTasks);
    }

    function editTask(id, title, text, executors){
        handleEditTask({id, title, text, executors});
        setTaskToEdit(null);
    }

    function handleLogout() {
        dispatch(logout());
    }

    if(user){
        return (
            <>
                <Sidebar onLogout={handleLogout} />
                
                <Routes>
                    <Route path="/" element={(
                        <main className="main">
                            <header className="header">
                                <span className="header-text">Мои задачи</span>
                            </header>

                            <div className="project-header">
                                <Filters filter={filter} setFilter={setFilter}/>
                            </div>

                            <Tasks tasks={tasks} filter={filter} openModal={openModal} setTasks={setTasks} user={user}/>
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
