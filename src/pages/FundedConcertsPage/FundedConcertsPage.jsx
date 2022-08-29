import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function FundedConcertsPage() {
 const {userId} = useParams();
 const [objUser, setObjUser] = useState(null);  
 

 const getUser = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/funded-concerts/${userId}`);
      setObjUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);


  return (
    <div className='funded-concerts'>
     {objUser && (
        <>
       <h2>funded concerts</h2>
       {objUser.fundedConcerts.map((concert) => {
       return (
        <div className='concert-card' key={concert._id}>
        <h3>{concert.artist}</h3> 
        <img className="artist-pic" src='https://cdn.smehost.net/formssonymusicfanscom-appirioprod/wp-content/uploads/2022/02/mm-cover.jpg' alt='rosalia'/>
         <h4>{concert.date}</h4>
        <h4>{concert.city}</h4>
        <h4>{concert.venue}</h4>
        <h4>{concert.budget}€</h4>
        <h4>{concert.minTicket}€</h4>
        <h4>{concert.usersFunding.length}</h4> 
       </div>

         )
        })}
        </>
        )}
    </div>
  )
}

export default FundedConcertsPage; 

