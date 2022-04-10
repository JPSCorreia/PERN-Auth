import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom'

function Register(props) {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });
  const { email, password, name } = inputs; // same as const email = inputs.email, const password= inputs.password, const name = inputs.name

  // change state when form inputs change
  const onChange = (event) => {
    setInputs({...inputs, [event.target.name] : event.target.value})
  }

  const body = { email, password, name }

  const onSubmitForm = async (event) => {

    event.preventDefault(); // prevents refreshing of page

    try {

      const response = await fetch('http://localhost:5001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })

      // get token
      const parseRes = await response.json()

      // store in local storage
      localStorage.setItem('token', parseRes.token)
      
      // set authorized state as true
      props.setAuth(true)
      
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <Fragment>
      <h1>Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3" // bootstrap for prettier form
          value={email}
          onChange={e => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3" // bootstrap for prettier form
          value={password}
          onChange={e => onChange(e)}
        />
        <input
          type="name"
          name="name"
          placeholder="name"
          className="form-control my-3" // bootstrap for prettier form
          value={name}
          onChange={e => onChange(e)}
        />
        <button
          className="btn btn-success btn-block"
        >
          Submit
        </button>
      </form>
      <Link to='/login'>Login</Link>
    </Fragment>
  )
}

export default Register;