import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/Sidebars/Sidebar';
import { Filters } from './components/Filters/Filters';
import { Tasks } from './components/Tasks/Tasks';
import Analytics from './components/Analytics/Analytics';
import Modal from './components/Modals/Modal';

import Authorization from './components/Authorization/Authorization';
import { useUserData } from './components/UserContext';

import { getTasks, createTask } from "./api/getTasks";
import { getUsers} from "./api/getUsers";

function getSavedTasks() {
    const savedTasks = localStorage.getItem('tasks');

    if (!savedTasks) {
        return [];
    }

    try {
        return JSON.parse(savedTasks);
    } catch (error) {
        localStorage.removeItem('tasks');
        return [];
    }
}

function getSavedFilter() {
    return localStorage.getItem('filter') || '';
}

export default function App() {
    const { user, logout } = useUserData();
    
    const [users, setUsers] = useState([]);

    const [tasks, setTasks] = useState(getSavedTasks);
    const [filter, setFilter] = useState(getSavedFilter);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTask, setEditTask] = useState(null);



    useEffect(() => {
        getUsers().then((data) => {
            setUsers(data);
        });
    }, []);
    useEffect(() => {
        if (localStorage.getItem('tasks')) {
            return;
        }

        getTasks().then((data) => {
            setTasks(data);
        });
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        if (filter) {
            localStorage.setItem('filter', filter);
        } else {
            localStorage.removeItem('filter');
        }
    }, [filter]);


    async function handleCreateTask(title) {
        const newTask = await createTask(title);
        setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    function openModal(taskToEdit) {
        const task = taskToEdit && taskToEdit.id ? taskToEdit : null;

        setEditTask(task);
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
            creator: user ? {
                name: user .name,
                login: user .login,
            } : null,
            executors: chosenExecutors,
        };

        setFilter('');
        setTasks((prevTasks) => [...prevTasks, newTask]);
        
        return true;
        
    }

    function editTasks(id, title, text, executors){
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    title,
                    text,
                    executors,
                };
            }
            
            return task;
        });

        setTasks(newTasks);
        setEditTask(null);
    }

    function handleLogout() {
        logout();
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

                            <Tasks tasks={tasks} filter={filter} openModal={openModal} setTasks={setTasks}/>
                        </main>
                    )} />
                    <Route path="/analytics" element={<Analytics tasks={tasks} />} />
                </Routes>

                {isModalOpen && (
                    <Modal
                        setIsModalOpen={setIsModalOpen}
                        addTask={addTask}
                        taskToEdit={editTask || null}
                        editTasks={editTasks}
                        setEditTask={setEditTask}
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
