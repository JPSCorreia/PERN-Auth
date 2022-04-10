import { Fragment, useState, useEffect } from 'react';

function Dashboard(props) {

  const [name, setName] = useState('')

  async function getName() {
    try {
      const response = await fetch('http://localhost:5001/dashboard', {
        method: 'GET',
        headers:{ token: localStorage.token }
      })
      // get token
      const parseRes = await response.json()
      
      setName(parseRes.user_name)

    } catch (error) {
      console.error(error.message)
    }
  } 

  const logout = (event) => {
    event.preventDefault(); // prevents refreshing of page
    localStorage.removeItem('token');
    props.setAuth(false)
  }

  useEffect(() => {
    getName();
  }, [])

  return (
    <Fragment>
      <h1>Hello {name} </h1>
      <button
          className="btn btn-success btn-block"
          onClick={event => logout(event)}
        >
          Logout
        </button>
    </Fragment>
  )
}

export default Dashboard;