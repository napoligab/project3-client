/* import axios from 'axios';
import {useParams} from 'react';

function FundedConcertsPage() {
const {userId} = useParams();



axios.get(`${process.env.REACT_APP_API_URL}/api//funded-concerts/${userId}}`)
.then((user) => {
    console.log(user)
})
.catch((err) => console.log((err.response.data.errorMessage)))

  return (
    <div>
       <h2>funded concerts</h2>
       
       <div className='concert-card'>
       <h3>{user.fundedConcerts.artist}</h3>
        <img className="artist-pic" src='https://cdn.smehost.net/formssonymusicfanscom-appirioprod/wp-content/uploads/2022/02/mm-cover.jpg' alt='rosalia'/>
        <h4>{user.fundedConcerts.date}</h4>
        <h4>{user.fundedConcerts.city}</h4>
        <h4>{user.fundedConcerts.venue}</h4>
        <h4>{user.fundedConcerts.budget}€</h4>
        <h4>{user.fundedConcerts.minTicket}€</h4>
        <h4>{user.fundedConcerts.usersFunding.length}</h4>
       </div>

    </div>
  )
}

export default FundedConcertsPage; */