import {useState, useContext} from 'react';
import {AuthContext} from '../../context/auth.context';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Request() {
const [message, setMessage] = useState('');
const {user} = useContext(AuthContext);

const navigate = useNavigate();

const handleMessage = (e) => setMessage(e.target.value)

const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');

    const body = {author: user._id, message} ;

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/request`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('message sent', response.data);
        navigate('/concerts');
      })
      .catch((err) => console.log(err));

    setMessage('');
  };


  return (
    <div>

    <form onSubmit={handleSubmit}>
    <textarea className="message text-black textarea textarea-secondary" type="text" rows='15' cols='40' onChange={handleMessage} placeholder="who would you like to see in your city?">
    </textarea>
    <button className="btn btn-primary btn-position">send request</button>
   </form>
    </div>
  )
}

export default Request