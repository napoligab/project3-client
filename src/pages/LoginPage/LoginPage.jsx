import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import './loginpage.css';

function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/login`, body)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/concerts');
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.errorMessage);
      });
  };

  return (
    <div>
      <h2>login</h2>

      <div className="login-page">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <b>email:</b>{' '}
          </label>
          <input
            className="input w-full max-w-xs"
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            placeholder="your email"
          />{' '}
          <br></br>
          <label htmlFor="password">
            <b>password:</b>{' '}
          </label>
          <input
            className="input w-full max-w-xs"
            type="password"
            name="password"
            value={password}
            minLength="6"
            onChange={handlePassword}
            placeholder="your password"
          />
          <br></br>
          <button className="login-btn btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>

      <div className="account-btn">
        {errorMessage && <p>{errorMessage}</p>}

        <p>Don't have an account?</p>
        <Link className="btn btn-primary" to="/signup">
          sign up
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
