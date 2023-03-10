import './App.css';
import { useState } from 'react';
import axios from 'axios';


function App() {
const [name, setName] = useState("");
const [age, setAge] = useState(0);
const [country, setCountry] = useState("");
const [position, setPosition] = useState("");
const [wage, setWage] = useState(0);

const [newWage, setNewWage] = useState(0);

const [employeeList, setEmployeeList] = useState([])

const addEmployee = () => {
    axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(() => {
      console.log("success")
    })
};

const getEmployee = () => {
  axios.get("http://localhost:3001/display").then((response) => {
      setEmployeeList(response.data);
    })
}

const UpdateEmployeeWage = (id) => {
  axios.put("http://localhost:3001/update", {wage: newWage, id: id})
  .then((response) => {
            setEmployeeList(employeeList.map((val) => {
              return val.id == id ? {id: val.id,
                name: val.name,
                age: val.age,
                country: val.country,
                position: val.position,
                wage: newWage 
              }: val
            }))
    });
};

const deleteEmployee = (id) => {
  axios.delete(`http://localhost:3001/delete/${id}`).then((response)=> {
    setEmployeeList(employeeList.filter((val) => {
      return val.id !== id 
    }))
  })
}

  return (
    <div className='App'>
    <div className='information'>
      <label>Name:</label>
      <input type="text" onChange={(event) => { setName(event.target.value)}}/>
      <label>Age:</label>
      <input type="Number" onChange={(event) => { setAge(event.target.value)}}/>
      <label>Country:</label>
      <input type="text" onChange={(event) => { setCountry(event.target.value)}}/>
      <label>Position:</label>
      <input type="text" onChange={(event) => { setPosition(event.target.value)}}/>
      <label>Wage (year):</label>
      <input type="Number" onChange={(event) => { setWage(event.target.value)}}/>

      <button onClick={addEmployee}>Add Employee</button>
      <hr />
      <div className='employees'>
      <button onClick={getEmployee} >Show Employees</button>

      {employeeList.map((val, key) => {
        return(
        <div className='employee'>
          <div>
          <h3>Name: {val.name}</h3>
          <h3>Age: {val.age}</h3>
          <h3>Country: {val.country}</h3>
          <h3>Position: {val.position}</h3>
          <h3>Wage: {val.wage}</h3>
          </div>
          <input type="text" placeholder='...'
          onChange={(event) => { setNewWage(event.target.value)}} />

          <button onClick={() => {UpdateEmployeeWage(val.id)}}>
            Update
          </button>
          <button onClick={() => {deleteEmployee(val.id)}}>
            Delete
          </button>
        </div>) 
      })}
      </div>
    </div>
    </div>

  );
}
export default App;
