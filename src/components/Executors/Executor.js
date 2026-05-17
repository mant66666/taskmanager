export default function Executor(props) {
    return (
        <article
            className={`task-form__executor${props.isSelected ? ' task-form__executor--selected' : ''}`}
            onClick={props.onClick}
        >
            <div className="task-form__executor-top">
                <h4 className="task-form__executor-name">{props.executorData.name}</h4>
                <span className="task-form__executor-role">{props.executorData.role}</span>
            </div>

            <p className="task-form__executor-company">{props.executorData.company}</p>
        </article>
    );
}
