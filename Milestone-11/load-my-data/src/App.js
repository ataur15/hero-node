import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email }
    console.log(newUser);

    // send data to the server
    fetch(`http://localhost:5000/users`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        const newUser = [...users, data];
        setUsers(newUser);
      })

    nameRef.current.value = "";
    emailRef.current.value = "";
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" ref={nameRef} placeholder="Name" /> <br />
        <input type="email" ref={emailRef} placeholder="Email" /> <br />
        <input type="submit" value="Submit" />
      </form>
      <h1>Users: {users.length}</h1>
      <ul>
        {
          users.map(user => <li key={user.id}><div>{user.id} {user.name}</div> <div>{user.email}</div></li>)
        }
      </ul>
    </div>
  );
}

export default App;
