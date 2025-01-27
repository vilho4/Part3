const HandleList = ({ persons, deletePerson }) => {
// const HandleList = ({ persons}) => {
    return (
      <div>
        {persons.map((person) => (
          <div key={person.id}>
            {person.name} {person.number} tama on id= {person.id} <button onClick={() => deletePerson(person)}>Delete</button>
            {/* <button onClick={() => onDelete(person.id)}>Delete</button> */}
          </div>
        ))}
      </div>
    )
}

export default HandleList