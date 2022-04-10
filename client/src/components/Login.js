
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom'

function Login(props) {

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = (event) => {
    setInputs({...inputs, [event.target.name] : event.target.value})
  }

  const body = { email, password }

  const onSubmitForm = async (event) => {

    event.preventDefault(); // prevents refreshing of page

    try {

      const response = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })

      // get token
      const parseRes = await response.json()
      console.log(parseRes)

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
      <h1>Login</h1>
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
        <button
          className="btn btn-success btn-block"
        >
          Submit
        </button>
      </form>
      <Link to='/register'>Register</Link>
    </Fragment>
  )
}

export default Login;