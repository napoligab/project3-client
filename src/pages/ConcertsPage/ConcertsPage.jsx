import './concerts.css';
import { Link } from 'react-router-dom';
import Searchbar from '../../components/Searchbar/Searchbar';
import { /* useContext ,*/ useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';

function ConcertsPage() {
  const { user } = useContext(AuthContext);
  const [concerts, setConcerts] = useState([]);

  const getConcerts = async () => {
    try {
      const token = localStorage.getItem('authToken');
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/concerts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setConcerts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConcerts();
  }, []);

  return (
    <div>
      <h2>concerts</h2>

      <Searchbar />

      {concerts.map((concert) => {
        return (
          <div>
          <>

          {user.admin &&
           <Link to={'/createconcerts'}>
            <button className="fund-btn">create concert!</button>
           </Link>} 
          </>
          <div className="concert-card mt-4" key={concert._id}>
              <h3>artist: {concert.artist}</h3>
              <img className="artist-pic" src={concert.image} alt="artist" />
              <h4>
              concert day: {concert.date.slice(0, 10).split('-').reverse().join('/')}
              </h4>
              <h4>city: {concert.city}</h4>
              <h4>venue: {concert.venue}</h4>
              {concert.budget <= 0 ?
                <h4>this concert is happening! </h4> :
                <h4>budget: {concert.budget}</h4>
              }
              <h4> ticket price: {concert.minTicket}€</h4>
              <h4>people going: {concert.usersFunding.length}</h4>


            {!user.admin &&
            <Link to={`/concerts/${concert._id}/fund`}>
             <button className="fund-btn">fund!</button>
            </Link>} 

           {user.admin && 
            <Link to={`/concerts/${concert._id}/edit`}>
             <button className="fund-btn">edit concert!</button>
            </Link>
            } 

  
          </div> 

      </div>
        );
      })}
     </div>
  );
}

export default ConcertsPage;
