
import './App.css';
import { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = boolean => {
    setIsAuthenticated(boolean)
  };

  async function isAuth() {

    try {
      const response = await fetch('http://localhost:5001/auth/is-verify', {
        method: 'GET',
        headers: {token: localStorage.token}
      })

      // get token
      const parseRes = await response.json()
      parseRes === true? setIsAuthenticated(true) : setIsAuthenticated(false)

    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    isAuth();
  })

  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Routes>
            <Route
             exact 
             path='/'
             element = { <Navigate to="/dashboard" /> } 
            >
            </Route>
            <Route
             exact 
             path='/login'
             element={ !isAuthenticated? <Login isAuthenticated={isAuthenticated} setAuth={setAuth} /> : <Navigate to="/dashboard" /> } 
            >
            </Route>
            <Route
             exact 
             path='/register'
             element={ !isAuthenticated? <Register isAuthenticated={isAuthenticated} setAuth={setAuth} /> : <Navigate to="/dashboard" /> } 
            >
            </Route>
            <Route
             exact 
             path='/dashboard'
             element={ isAuthenticated? <Dashboard isAuthenticated={isAuthenticated} setAuth={setAuth} /> : <Navigate to="/login" /> } 
            >
            </Route>
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
