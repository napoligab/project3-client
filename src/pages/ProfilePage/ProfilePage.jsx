import {/* useContext */ useEffect, useState} from 'react';
/* import { AuthContext } from '../../context/auth.context';  */
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'
import './profile.css';


function ProfilePage() {
const [user, setUser] = useState(null);
const {userId} = useParams();

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
      <h2 className='text-2xl'>my account</h2>

 <div className='concert-card'>

    {user && (
    <>
    <h4><b>first name:</b> {user.firstName}</h4>
    <h4><b>last name:</b> {user.lastName}</h4>
    <h4><b>email:</b> {user.email}</h4>
    <h4><b>city:</b> {user.city}</h4>
    <h4><b>credit card number:</b> {user.creditCard}</h4>
    <img className="artist-pic" src={user.profilePicture} alt="profile" />

    <Link to={`/edit/${user._id}`}>
        <button className='btn btn-primary '>edit profile</button>
    </Link>
    </>
    )}
 </div>

    </div>
  )
}

export default ProfilePage;