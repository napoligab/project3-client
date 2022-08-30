import axios from "axios";
import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import './signup.css';

function SignupPage() {
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [creditCard, setCreditCard] = useState('');
const [city, setCity] = useState('');
const [errorMessage, setErrorMessage] = useState('');

const navigate = useNavigate();

const handleFirstName = (e) => setFirstName(e.target.value);
const handleLastName = (e) => setLastName(e.target.value);
const handleEmail = (e) => setEmail(e.target.value);
const handlePassword = (e) => setPassword(e.target.value);
const handleCreditCard= (e) => setCreditCard(e.target.value);
const handleCity= (e) => setCity(e.target.value);


const handleSubmit = (e) => {
 e.preventDefault();
 
 const body = {firstName, lastName, email, password, creditCard, city};

  axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, body)
  .then(() => navigate ('/login'))
  .catch ((err) => {
    console.log(err)
     setErrorMessage(err.response.data.errorMessage);
  })
}


  return (
    
    <div className="SignupPage">
    <h2>sign up</h2>

    <div className="login-page">

    <form onSubmit={handleSubmit}>
    <label htmlFor="firstName"><b>first name:</b> </label>
    <input type="text" name="text" value={firstName} placeholder="first name" onChange= {handleFirstName} /> <br></br>

    <label htmlFor="lastName"><b>last name:</b> </label>
    <input type="text" name="lastName" value={lastName} placeholder="last name" onChange= {handleLastName} /> <br></br>

    <label htmlFor="email"><b>email:</b> </label>
    <input type="email" name="email" value={email} placeholder="your email" onChange= {handleEmail} /> <br></br>

    <label htmlFor="password"><b>password:</b> </label>
    <input type="password" name="password" value={password} placeholder="your password" onChange= {handlePassword} /> <br></br>

    <label htmlFor="creditCard"><b>credit card:</b> </label>
    <input type="text" name="creditCard" value={creditCard} placeholder="credit card number" minLength="16" maxLength="16" onChange= {handleCreditCard} /> <br></br>

    <label htmlFor="city"><b>city:</b> </label>
    <input type="text" name="city" value={city} placeholder="city" onChange= {handleCity} /> <br></br>

    <button type="submit">sign up</button>
        </form>
    </div>

      <div className="account-btn">
    {errorMessage && (<p>{errorMessage}</p>)}

    <p>Already have an account?</p>
    <Link className="login-btn" to="/login">login</Link>
     </div>

    </div>
  )
}

export default SignupPage;