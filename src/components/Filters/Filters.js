import { Filter } from "./Filter"
export function Filters(props){

    function toggleFilter(value) {
        if (props.filter === value) {
            props.setFilter('');
        } else {
            props.setFilter(value);
        }
    }
    
    let filterProps = [
        {
            label: 'Выполненные',
            name: 'completed'
        },
        {
            label: 'Активные',
            name: 'active'
        }
    ]

    let filters = filterProps.map((filter) => {
        return <Filter key={filter.name} checked={filter.name == props.filter} toggleFilter={toggleFilter} label={filter.label} name={filter.name}/>
    })
    
    return(
        <div className="filters">
            {filters}
        </div>
    )
}