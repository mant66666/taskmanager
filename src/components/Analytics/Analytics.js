import { useSelector } from 'react-redux';
export default function Analytics({ tasks = [] }) {
    const user = useSelector((state) => state.user.user) || {};
    let sortedTasks=tasks.filter((task)=>task.creator?.login === user.login || task.executors?.some((executor) => executor.login === user.login));
    const completedTasks = sortedTasks.filter((task) => task.completed).length;
    const activeTasks = sortedTasks.length - completedTasks;
    const completedPercent = sortedTasks.length
        ? Math.round((completedTasks / sortedTasks.length) * 100)
        : 0;

    return (
        <main className="main">
            <header className="header">
                <span className="header-text">Аналитика</span>
            </header>

            <section className="analytics">
                <div className="analytics__item">
                    <span className="analytics__label">Всего задач</span>
                    <strong className="analytics__value">{sortedTasks.length}</strong>
                </div>

                <div className="analytics__item">
                    <span className="analytics__label">В работе</span>
                    <strong className="analytics__value">{activeTasks}</strong>
                </div>

                <div className="analytics__item">
                    <span className="analytics__label">Выполнено</span>
                    <strong className="analytics__value">{completedTasks}</strong>
                </div>

                <div className="analytics__item">
                    <span className="analytics__label">Прогресс</span>
                    <strong className="analytics__value">{completedPercent}%</strong>
                </div>
            </section>
        </main>
    );
}
