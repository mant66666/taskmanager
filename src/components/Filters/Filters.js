import { Filter } from "./Filter"
export function Filters(props){
    function toggleFilter(value) {
        if (props.filter === value) {
            props.setFilter('');
        } else {
            props.setFilter(value);
        }
    }
    return(
        <div className="filters">
            <Filter filter={props.filter} toggleFilter={toggleFilter} name={"Выполненные"} type={"completed"}/>
            <Filter filter={props.filter} toggleFilter={toggleFilter} name={"Активные"} type={"active"}/>
        </div>
    )
}