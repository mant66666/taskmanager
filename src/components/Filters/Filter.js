export function Filter(props){
    return (
        <div className="filters__item">
                <input
                    type="checkbox"
                    className="filters__checkbox"
                    checked={props.checked}
                    onChange={() => props.toggleFilter(props.name)}
                    name={props.name}
                />
                <label className="filters__label">
                    {props.label}
                </label>
        </div>
    )
}