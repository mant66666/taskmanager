import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebars/Sidebar';
import { Filters } from './components/Filters/Filters';
import { Tasks } from './components/Tasks/Tasks';
import Modal from './components/Modals/Modal';
export default function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        const savedFilter = localStorage.getItem('filter');

        if (savedTasks) {
            try {
                setTasks(JSON.parse(savedTasks));
            } catch (error) {
                setTasks([]);
            }
        }

        if (savedFilter) {
            setFilter(savedFilter);
        }
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

    function openModal() {
        setIsModalOpen(true);
    }
    function addTask(title,description) {

        if (!title.trim() && !description.trim()) {
            return;
        }

        const newTask = {
            id: Date.now(),
            title: title.trim(),
            text: description.trim(),
            completed: false,
        };

        setTasks([...tasks, newTask]);
    }

    return (
        <>
            <Sidebar />

            <main className="main">
                <header className="header">
                    <span className="header-text">Мои задачи</span>
                </header>

                <div className="project-header">
                    <Filters filter={filter} setFilter={setFilter}/>
                </div>

                <Tasks tasks={tasks} filter={filter} openModal={openModal} setTasks={setTasks}/>

                {isModalOpen && (
                    <Modal setIsModalOpen={setIsModalOpen} addTask={addTask}/>
                )}
            </main>
        </>
    );
}
