import {/* useContext */ useEffect, useState} from 'react';
/* import { AuthContext } from '../../context/auth.context';  */
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'
import './profile.css';


function ProfilePage() {

 
const [user, setUser] = useState(null);
/* const {user: loggedUser} = useContext(AuthContext); */
const {userId} = useParams();

/* console.log("1: ", loggedUser._id)
console.log("2: ", userId)

console.log(user); */

const getUser = async () => {
    try {
     const token = localStorage.getItem('authToken');
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      setUser(response.data)
    } catch (err) {
      console.log(err)
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

    <Link to={`/edit/${user._id}`}>
        <button>edit profile</button>
    </Link>
    </>
    )}
    </div>
  )
}

export default ProfilePage;