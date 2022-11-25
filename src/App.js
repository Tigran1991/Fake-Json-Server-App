import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState()
  const [personData, setPersonData] = useState([])
  const [stateChangeIndicator, setStateChangeIndicator] = useState(false)

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  }

  const handleAgeChange = (e) => {
    setAge(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:5000/users", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        age: age,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json())
    setStateChangeIndicator(!stateChangeIndicator)
  }

  const handleClick = (e) => {
    const id = e.target.id
    fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" })
    setStateChangeIndicator(!stateChangeIndicator)
  }

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((resp) => resp.json())
      .then((data) => {
        setPersonData(data)
      })
  }, [stateChangeIndicator])

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="FirstName"
          onChange={handleFirstNameChange}
        />
        <input
          type="text"
          placeholder="LastName"
          onChange={handleLastNameChange}
        />
        <input type="number" placeholder="Age" onChange={handleAgeChange} />
        <button type="submit">Submit</button>
      </form>
      {personData &&
        personData.map((person) => (
          <>
            <ul key={person.id} onClick={handleClick} id={person.id}>
              {person.firstName}
            </ul>
          </>
        ))}
    </div>
  )
}

export default App
