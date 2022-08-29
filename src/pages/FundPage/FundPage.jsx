import {useParams} from 'react-router-dom';
import {useState} from 'react';
import './fund.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


function FundPage(props) {
    const {concerts} = props;
    const { concertId } = useParams();
    const [qtyTickets, setQtyTickets] = useState(0);

    const navigate = useNavigate();

    const foundConcert = concerts.find((concert) => concert._id === concertId);

    
    const handleTickets = (e) => setQtyTickets(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const body = {qtyTickets};
        
         axios
         .put(`${process.env.REACT_APP_API_URL}/api/concerts/${concertId}/fund`, body)
         .then((response) => {
          console.log(response.data);
          navigate ('/funded-concerts')
         }) 
         .catch((err) => console.log(err.response.data.errorMessage));

         setQtyTickets(0);

        }

        return (
            
            <div className="concert-card">

             {!foundConcert && <h3>No artist found</h3>}
            
             {foundConcert && (
                <>
             
              <h3>{foundConcert.artist}</h3>
              <img className="artist-pic" src='https://cdn.smehost.net/formssonymusicfanscom-appirioprod/wp-content/uploads/2022/02/mm-cover.jpg' alt='rosalia'/>
              <h4>{foundConcert.date}</h4>
              <h4>{foundConcert.city}</h4>
              <h4>{foundConcert.budget}€ to go</h4>
              <h4>{foundConcert.minTicket}€</h4>
             
              <form onSubmit={handleSubmit}>
               <input type="number" name="qtyTickets" placeholder='fund tickets' className='form' value={qtyTickets} onChange={handleTickets}/>
               <button className="fund-btn">fund!</button>
              </form>

                </>
            )}
              
          </div>
  )
}

export default FundPage;
