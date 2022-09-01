import axios from 'axios';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

function FundedConcertsPage() {
  const [objUser, setObjUser] = useState(null);
  const { user } = useContext(AuthContext);

  const getUser = async () => {
    try {
      const token = localStorage.getItem('authToken');
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/funded-concerts/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setObjUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  return (
    <div className="funded-concerts">
      {objUser && (
        <>
          <h2>funded concerts</h2>
          {objUser.fundedConcerts.map((concert) => {
            return (
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
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default FundedConcertsPage;
