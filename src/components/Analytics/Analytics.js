export default function Analytics({ tasks = [] }) {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const activeTasks = tasks.length - completedTasks;
    const completedPercent = tasks.length
        ? Math.round((completedTasks / tasks.length) * 100)
        : 0;

    return (
        <main className="main">
            <header className="header">
                <span className="header-text">Аналитика</span>
            </header>

            <section className="analytics">
                <div className="analytics__item">
                    <span className="analytics__label">Всего задач</span>
                    <strong className="analytics__value">{tasks.length}</strong>
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
