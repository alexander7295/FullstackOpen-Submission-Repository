const Persons = (props) => {
    return (
        <div>
            {props.namesToShow.map(person => <div key={person.name}>{person.name} {person.number} <button onClick={() => props.handleDelete(person.id, person.name)}>Delete</button></div>)}
        </div>
    )
}

export default Persons