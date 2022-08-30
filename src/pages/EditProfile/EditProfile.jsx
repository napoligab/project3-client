import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom'; 


function EditProfile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [creditCard, setCreditCard] = useState('');
    const [city, setCity] = useState('');
    const [user, setUser] = ('');
    
    const {userId} = useParams();
    
    const navigate = useNavigate();

    const getUser = async () => {
        try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${userId}`)
         console.log(response.data)
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
    const handleProfilePictute= (e) => setProfilePicture(e.target.value);
    const handleCreditCard= (e) => setCreditCard(e.target.value);
    const handleCity= (e) => setCity(e.target.value);
    
    const handleSubmit = (e) => {
     e.preventDefault();
     
     const body = {firstName, lastName, email, city, creditCard, profilePicture };

            axios.put(`${process.env.REACT_APP_API_URL}/api/edit/${userId}`, body)
            .then(() =>  {
                setFirstName('');
                setLastName('');
                setEmail('');
                setProfilePicture('');
                setCreditCard('');
                setCity('');
                navigate(`/user/${userId}`)
            })
         .catch((err) => console.log(err.response.data.errorMessage));
        };

  //Delete user      

 /* const deleteUser = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/edit/${userId}`)
    .then(()=> navigate('/'))
    .catch((err) => console.log(err));
 } */
    

  return (

    <div className="edit-profile">

    <h2>edit profile</h2>

    <div className="login-page">

    <form onSubmit={handleSubmit}>
    <label htmlFor="firstName"><b>first name:</b> </label>
    <input type="text" name="text" value={firstName} placeholder="first name" onChange= {handleFirstName} /> <br></br>

    <label htmlFor="lastName"><b>last name:</b> </label>
    <input type="text" name="lastName" value={lastName} placeholder="last name" onChange= {handleLastName} /> <br></br>

    <label htmlFor="email"><b>email:</b> </label>
    <input type="email" name="email" value={email} placeholder="your email" onChange= {handleEmail} /> <br></br>

  {/*   <label htmlFor="profilePicture"><b>profilePicture:</b> </label>
    <input type="file" name="profilePicture" value={profilePicture} onChange= {handleProfilePicture} /> <br></br> */}

    <label htmlFor="creditCard"><b>credit card:</b> </label>
    <input type="text" name="creditCard" value={creditCard} placeholder="credit card number" minLength="16" maxLength="16" onChange= {handleCreditCard} /> <br></br>

    <label htmlFor="city"><b>city:</b> </label>
    <input type="text" name="city" value={city} placeholder="city" onChange= {handleCity} /> <br></br>

    <button type="submit">update</button>
        </form>

    </div>
    </div>
  )
 }
 


export default EditProfile;