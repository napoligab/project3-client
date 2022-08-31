import { useParams } from 'react-router-dom';
import { useState, useContext } from 'react';
import './fund.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function FundPage(props) {
  const { concerts } = props;
  const { concertId } = useParams();
  const [qtyTickets, setQtyTickets] = useState(0);
  const [user, setUser] = useState(0);
  const { user: loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const foundConcert = concerts.find((concert) => concert._id === concertId);

  const handleTickets = (e) => setQtyTickets(e.target.value);

  const handleSubmit = (e) => {
    const token = localStorage.getItem('authToken');
    e.preventDefault();

    const body = { qtyTickets };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/concerts/${concertId}/fund`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate(`/funded-concerts/${loggedUser._id}`);
      })
      .catch((err) => console.log(err.response.data.errorMessage));

    setQtyTickets(0);
  };

  return (
    <div className="concert-card">
      {!foundConcert && <h3>No artist found</h3>}

      {foundConcert && (
        <>
              <h3>{foundConcert.artist}</h3>
              <img className="artist-pic" src={foundConcert.image} alt="artist" />
              <h4>{foundConcert.date.slice(0, 10).split('-').reverse().join('/')}</h4>
              <h4>{foundConcert.city}</h4>
              <h4>{foundConcert.venue}</h4>
              <h4>{foundConcert.budget}€</h4>
              <h4>{foundConcert.minTicket}€</h4>
              <h4>{foundConcert.usersFunding.length}</h4>
            

          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="qtyTickets"
              placeholder="fund tickets"
              className="form"
              value={qtyTickets}
              onChange={handleTickets}
            />
            <button className="fund-btn">fund!</button>
          </form>
        </>
      )}
    </div>
  );
}

export default FundPage;
