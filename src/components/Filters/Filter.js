export function Filter(props){
    return (
        <div className="filters__item">
                <input
                    type="checkbox"
                    className="filters__checkbox"
                    checked={props.filter === props.type}
                    onChange={() => props.toggleFilter(props.type)}
                />
                <label className="filters__label">
                    {props.name}
                </label>
        </div>
    )
}