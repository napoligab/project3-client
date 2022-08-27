import './concerts.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Searchbar from '../../components/Searchbar/Searchbar';



function ConcertsPage() {
  const [concerts, setConcerts] = useState([]);  


const getConcerts = async () => {
    try {
    let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/concerts`)
     console.log(response.data)
      setConcerts(response.data)
    } catch (err) {
    console.log(err)
    } 
   }

   useEffect(() => {
    getConcerts();
  }, []);

  return (
    <div>
        <h2>concerts</h2>
        
     <Searchbar />

      {concerts.map((concert) => {
      return (
        <div className="concert-card" key={concert._id}> 

       <Link to={`/concerts/${concert._id}`}> 
        <h3>{concert.artist}</h3>
        <img className="artist-pic" src='https://cdn.smehost.net/formssonymusicfanscom-appirioprod/wp-content/uploads/2022/02/mm-cover.jpg' alt='rosalia'/>
        <h4>{concert.city}</h4>
        <h4>{concert.venue}</h4>
        <h4>{concert.date}</h4>
        <h4>{concert.budget}€</h4>
        <h4>{concert.minTicket}€</h4>
       </Link>

       <Link to={`/concerts/${concert._id}/fund`}>
        <button className="fund-btn">fund</button>
       </Link>
        
        </div>
      )
      })}
        
    </div>
  )
}

export default ConcertsPage;