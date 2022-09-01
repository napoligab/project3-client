import './concerts.css';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import calendar from '../../calendar.png';


function ConcertsPage() {
  const { user } = useContext(AuthContext);
  const [concerts, setConcerts] = useState([]);
  const [query, setQuery] = useState('');

  //fazer um loop nos concerts e filtrar os que dão match no nome do artista

  /* const handleInput = (e) => setInput(e.target.value); */

  const handleQuery = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };
  const handleSearch = (searchStr) => {
    let filtered = concerts.filter((el) => {
      return el.artist.toLowerCase().includes(searchStr.toLowerCase());
    });

    setConcerts(filtered);
  };

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

      <input
        type="text"
        className="text-black"
        onChange={handleQuery}
        value={query}
      />
 
             {user && user.admin && (
                <Link to={'/createconcerts'}>
                  <button className="btn btn-primary">create concert!</button>
                </Link>
              )}

      { user && concerts && 

        concerts.map((concert) => {
          return (
            <div className="concert-card mt-4" key={concert._id}>
             <h3 className='text-2xl'><b>{concert.artist}</b></h3>
              <img className="artist-pic" src={concert.image} alt="artist" />
            <h4> <b>date:</b> {concert.date.slice(0, 10).split('-').reverse().join('/')}</h4>
              <h4><b>city:</b> {concert.city}</h4>
              <h4><b>venue:</b> {concert.venue}</h4>
              {concert.budget <= 0 ? (
                <h4><b>this concert is happening!</b> </h4>
              ) : (
                <h4><b>budget:</b> {concert.budget}€</h4>
              )}
              <h4><b>ticket price:</b> {concert.minTicket}€</h4>
              <h4><b>people going:</b> {concert.usersFunding.length}</h4>
        

              {!user.admin && (
                <Link to={`/concerts/${concert._id}/fund`}>
                  <button className="btn btn-primary">fund!</button>
                </Link>
              )}

              {user.admin && (
                <Link to={`/concerts/${concert._id}/edit`}>
                  <button className="btn btn-primary">edit concert!</button>
                </Link>
              )}

              
            </div>
          );
        })}
    </div>
  );
}

export default ConcertsPage;
