import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Users from './components/Users/Users';
import AddUser from './components/AddUser/AddUser';
import UpdateUser from './components/UpdateUser/UpdateUser';

function App() {
  return (
    <div>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/users">
            <Users></Users>
          </Route>
          <Route path="/user/:id">
            <UpdateUser></UpdateUser>
          </Route>
          <Route path="/adduser">
            <AddUser></AddUser>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
