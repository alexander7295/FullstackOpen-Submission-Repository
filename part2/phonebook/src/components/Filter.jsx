const Filter = (props) => {
    return (
        <p>
            filter shown with <input value={props.nameFilter} onChange={props.handleNameFilterChange} />
        </p>
    )
}

export default Filter