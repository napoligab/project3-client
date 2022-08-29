import {useContext, useEffect} from 'react';
import { AuthContext } from '../../context/auth.context'; 
import {useParams} from 'react-router-dom'
import axios from 'axios';

function ProfilePage() {
const {userId} = useParams();
const {user} = useContext(AuthContext);

const getUser = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${userId}`);
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data.errorMessage);
    }
  };

  useEffect(() => {
    getUser();
  }, []);


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
    </>
    )}
    </div>
  )
}

export default ProfilePage