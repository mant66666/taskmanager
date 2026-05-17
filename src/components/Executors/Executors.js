import { useState } from 'react';
import Executor from './Executor';

export default function Executors(props) {
    const [isOpen, setIsOpen] = useState(false);
    const { chosenExecutors = [], setChosenExecutors = () => {} } = props;

    const executors = {
        users: [
            {
                name: 'ME',
            },
            {
                name: 'Alex Carter',
                role: 'Frontend Developer',
                company: 'NovaTech',
            },
            {
                name: 'Mia Johnson',
                role: 'Project Manager',
                company: 'BlueSoft',
            },
            {
                name: 'Daniel Lee',
                role: 'UI/UX Designer',
                company: 'PixelForge',
            },
            {
                name: 'Sophia Brown',
                role: 'QA Engineer',
                company: 'TestLab',
            },
            {
                name: 'Ethan Wilson',
                role: 'Backend Developer',
                company: 'CloudCore',
            },
        ],
    };

    function toggleExecutor(executor) {
        setChosenExecutors((prevChosenExecutors) => {
            const executorInArray = prevChosenExecutors.some(
                (item) => item.name === executor.name
            );

            if (executorInArray) {
                return prevChosenExecutors.filter(
                    (item) => item.name !== executor.name
                );
            }

            return [...prevChosenExecutors, executor];
        });
    }

    return (
        <div className="task-form__executors">
            <div className="task-form__executors-header">
                <div className="task-form__executors-heading">
                    <h3 className="task-form__executors-title">Выберите исполнителя</h3>
                    <span className="task-form__executors-count">{executors.users.length}</span>
                </div>

                <button
                    type="button"
                    className={`task-form__executors-toggle${isOpen ? ' task-form__executors-toggle--open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Свернуть исполнителей' : 'Показать исполнителей'}
                >
                    ^
                </button>
            </div>

            {isOpen && (
                <div className="task-form__executors-main">
                    {executors.users.map((executor, index) => (
                        <Executor
                            key={`${executor.name}-${index}`}
                            executorData={executor}
                            isSelected={chosenExecutors.some(
                                (item) => item.name === executor.name
                            )}
                            onClick={() => toggleExecutor(executor)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
