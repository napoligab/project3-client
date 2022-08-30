import {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../context/auth.context'; 
import {useParams} from 'react-router-dom'
import axios from 'axios';
import {Link} from 'react-router-dom'
import './profile.css';


function ProfilePage() {
const {userId} = useParams();
/* const {user} = useContext(AuthContext);
 */
const [user, setUser] = useState(null)
console.log(user);

const getUser = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${userId}`);
      console.log(response);
      setUser(response.data)
    } catch (err) {
      console.log(err.response.data.errorMessage);
    }
  }; 

  useEffect(() => { 
    getUser();
  }, []);   

/*   how to bring the user information here? */

  return (

    <div>
    <h2>my account</h2>

    {user && (
    <>
    <h4>first name: {user.firstName}</h4>
    <h4>last name: {user.lastName}</h4>
    <h4>email: {user.email}</h4>
    <h4>city: {user.city}</h4>
    <h4>credit card number: {user.creditCard}</h4>
    <h4>profile picture: {user.profilePicture}</h4>

    <Link to={`/edit/${userId}`}>
        <button>edit profile</button>
    </Link>
    </>
    )}
    </div>
  )
}

export default ProfilePage