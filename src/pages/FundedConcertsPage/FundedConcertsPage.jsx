import axios from 'axios';
import {useParams} from 'react';

function FundedConcertsPage() {
const {userId} = useParams();

foundUser = user._id

axios.get(`${process.env.REACT_APP_API_URL}/api//funded-concerts/${userId}}`)
.then((response) => {
    
    console.log(response.data)
})
.catch((err) => console.log((err.response.data.errorMessage)))

  return (
    <div>
       <h2>funded concerts</h2>
       
       <div className='concert-card'>

       </div>

    </div>
  )
}

export default FundedConcertsPage