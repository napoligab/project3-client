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
          <div className="concert-card mt-4" key={concert._id}>
            <Link to={`/concerts/${concert._id}`}>
              <h3>{concert.artist}</h3>
              <img className="artist-pic" src={concert.image} alt="artist" />
              <h4>
                {concert.date.slice(0, 10).split('-').reverse().join('/')}
              </h4>
              <h4>{concert.city}</h4>
              <h4>{concert.venue}</h4>
              <h4>{concert.budget}€</h4>
              <h4>{concert.minTicket}€</h4>
              <h4>{concert.usersFunding.length}</h4>
            </Link>

            {!user.admin && (
              <Link to={`/concerts/${concert._id}/fund`}>
                <button className="fund-btn">fund!</button>
              </Link>
            )}

            {user.admin && (
              <Link to={`/concerts/${concert._id}/edit`}>
                <button className="fund-btn">edit concert!</button>
              </Link>
            )}

            {user.admin && (
              <Link to={'/createconcerts'}>
                <button className="fund-btn">create concert!</button>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ConcertsPage;
