import axios from 'axios';
import {useState, useEffect, useContext} from 'react';
import {useNavigate, useParams} from 'react-router-dom'; 
import { AuthContext } from '../../context/auth.context';
import './editProfile.css';


function EditProfile() {
    const {user: loggedUser} = useContext(AuthContext); 
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [creditCard, setCreditCard] = useState("");
    const [city, setCity] = useState("");
    const [user, setUser] = useState(null);

    const {userId} = useParams();
    
    const navigate = useNavigate();

    const getUser = async () => {
        try {
        const token = localStorage.getItem('authToken');
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          } )
          setFirstName(response.data.firstName)
          setLastName(response.data.lastName)
          setEmail(response.data.email)
          setCreditCard(response.data.creditCard)
          setCity(response.data.city)
          setUser(response.data)
        } catch (err) {
        console.log(err)
        } 
       }

       useEffect(() => {
        getUser();
      }, []); 

    
    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleCreditCard= (e) => setCreditCard(e.target.value);
    const handleCity= (e) => setCity(e.target.value);

    const handleImageUrl = (e) => {
        const uploadData = new FormData();

        const token = localStorage.getItem('authToken'); 
    
        uploadData.append('imageUrl', e.target.files[0]);
        axios
          .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            setProfilePicture(response.data.fileUrl);
            console.log(response.data.fileUrl);
          })
          .catch((err) => console.log('Error while uploading the file: ', err));
      };
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');

     const body = {firstName, lastName, email, city, creditCard, profilePicture};

            axios.put(`${process.env.REACT_APP_API_URL}/api/edit/${userId}`, body, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
            .then(() =>  {
                setFirstName('');
                setLastName('');
                setEmail('');
                setCity('');
                setCreditCard('');
                setProfilePicture('');
                navigate(`/user/${userId}`)
            })
         .catch((err) => console.log(err.response.data.errorMessage));
        };

  //Delete user      

  const deleteUser = () => {
    const token = localStorage.getItem('authToken');

    axios.delete(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(()=> navigate('/'))
    .catch((err) => console.log(err));
 }
    

  return (

    <div>

    <h2 className='text-2xl'>edit profile</h2>

    <div className="login-page">

    <form onSubmit={handleSubmit}>
    {user && (
<>
        <label htmlFor="firstName"><b>first name:</b> </label>
    <input className='input w-full max-w-xs' type="text" name="text" value={firstName} placeholder="first name" onChange={handleFirstName} /> <br></br>

    <label htmlFor="lastName"><b>last name:</b> </label>
    <input className='input w-full max-w-xs' type="text" name="lastName" value={lastName} placeholder="last name" onChange={handleLastName} /> <br></br>

    <label htmlFor="email"><b>email:</b> </label>
    <input className='input w-full max-w-xs' type="email" name="email" value={email} placeholder="your email" onChange={handleEmail} /> <br></br>

    <label htmlFor="profilePicture"><b>profilePicture:</b> </label>
<input className='input w-full max-w-xs' type="file" name="profilePicture" onChange= {handleImageUrl} /> <br></br> 

    <label htmlFor="creditCard"><b>credit card:</b> </label>
    <input className='input w-full max-w-xs' type="text" name="creditCard" value={creditCard} placeholder="credit card number" minLength="16" maxLength="16" onChange= {handleCreditCard} /> <br></br>

    <label htmlFor="city"><b>city:</b> </label>
    <input className='input w-full max-w-xs' type="text" name="city" value={city} placeholder="city" onChange={handleCity} /> <br></br>

    <button className='btn btn-primary btn-position' type="submit">update</button>
    </>
)}
        </form>
    </div>

    <button className='btn btn-primary btn-position' onClick={deleteUser}>delete profile</button>

    </div>
  )
 }
 

export default EditProfile;