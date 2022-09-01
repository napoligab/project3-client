import './concerts.css';
import { Link } from 'react-router-dom';
import Searchbar from '../../components/Searchbar/Searchbar';

function ConcertsPage(props) {
  const { concerts } = props;

  return (
    <div>
      <h2>concerts</h2>

      <Searchbar />

      {/* these  button should be available for admin only */}

      <div className="concerts-btns-container">
        <Link to={'/createconcerts'}>
          <button className="btn btn-primary">create concert!</button>
        </Link>

        {/* these  button should be available for users only */}
        <Link to={'/request'}>
          <button className="btn btn-primary">send us your request</button>
        </Link>
        <Link to={'/checkrequests'}>
          <button className="btn btn-primary">check requests</button>
        </Link>
      </div>

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

            {/* these two buttons should be available for users only */}
            <Link to={`/concerts/${concert._id}/fund`}>
              <button className="btn btn-primary btn-xs">fund!</button>
            </Link>

            {/* these two buttons should be available for admin only */}
            <Link to={`/concerts/${concert._id}/edit`}>
              <button className="btn btn-primary btn-xs">edit concert</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ConcertsPage;
