import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditConcert() {
  const [artist, setArtist] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [venue, setVenue] = useState('');
  const [budget, setBudget] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [minTicket, setMinTicket] = useState(0);
  const { concertId } = useParams();
  const navigate = useNavigate();

  const [artists, setArtists] = useState([]);
  const [query, setQuery] = useState('');
  const [showBar, setShowBar] = useState(true);

  const getArtists = async () => {
    try {
      const response = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${query}&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json`
      );
      console.log(response.data.results.artistmatches.artist);
      setArtists(response.data.results.artistmatches.artist);
      setShowBar(false);
    } catch (error) {
      alert(error);
    }
  };

  const getConcert = async () => {
    const token = localStorage.getItem('authToken');
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/concerts/${concertId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.artist)
      setImage(response.data.image);
      setDate(response.data.date);
      setCity(response.data.city);
      setVenue(response.data.venue);
      setBudget(response.data.budget);
      setDeadline(response.data.deadline);
      setMinTicket(response.data.minTicket);
    } catch (err) {
      console.log(err.response.data.errorMessage);
    }
  };

  useEffect(() => {
    getConcert();
    getArtists();
  }, []);

  const handleArtist = (e) => setArtist(e.target.value);
  const handleDate = (e) => setDate(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleVenue = (e) => setVenue(e.target.value);
  const handleBudget = (e) => setBudget(e.target.value);
  const handleDeadline = (e) => setDeadline(e.target.value);
  const handleMinTicket = (e) => setMinTicket(e.target.value);

  const handleImageUrl = (e) => {
    const uploadData = new FormData();
    const token = localStorage.getItem('authToken');

    uploadData.append('imageUrl', e.target.files[0]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setImage(response.data.fileUrl);
        console.log(response.data.fileUrl);
      })
      .catch((err) => console.log('Error while uploading the file: ', err));
  };

  const handleSubmit = (e) => {
      e.preventDefault();

    const token = localStorage.getItem('authToken');

    const body = {
        artist,
        image,
        date,
        city,
        venue,
        budget,
        deadline,
        minTicket,
    };

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/concerts/${concertId}/edit`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      .then(() => {
        setArtist('');
        setImage('');
        setDate('');
        setCity('');
        setVenue('');
        setBudget('');
        setDeadline('');
        setMinTicket('');
        navigate('/concerts');
      })
      .catch((err) => console.log(err.response.data.errorMessage));
  };


  // Delete concert

  const deleteConcert = () => {
    const token = localStorage.getItem('authToken');

    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/concerts/${concertId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => navigate('/concerts'))
      .catch((err) => console.log(err));
  };

  return (
    <div className="edit-concert">
      <h3>edit concert</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="artist">artist</label>
        <>
          {showBar ? (
            <>
              <input
                type="text" className="text-black"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
              <p onClick={() => getArtists()}>Submit</p>
            </>
          ) : (
            <></>
          )}
          {artists.length > 0 && (
            <>
              <select onChange={handleArtist}>
                <option value={'No Artist Selected'}></option>
                {artists.map((artist) => {
                  return (
                    <option
                      onClick={(e) => setQuery(e.target.value)}
                      key={artist.name}
                      value={artist.name.toString()}
                    >
                      {artist.name}
                    </option>
                  );
                })}
              </select>
            </>
          )}
        </>
          
        <label htmlFor="image">picture</label>
        <input type="file" name="image" onChange={handleImageUrl} />

        <label htmlFor="date">date</label>
        <input type="date" name="date" value={date} onChange={handleDate} />

        <label htmlFor="city">city</label>
        <input type="text" name="city" value={city} onChange={handleCity} />

        <label htmlFor="venue">venue</label>
        <input type="text" name="venue" value={venue} onChange={handleVenue} />

        <label htmlFor="budget">budget</label>
        <input type="number" name="budget" value={budget} onChange={handleBudget} />

        <label htmlFor="deadline">deadline</label>
        <input type="date" name="deadline" value={deadline} onChange={handleDeadline} />

        <label htmlFor="ticket">min ticket</label>
        <input type="number" name="ticket" bvalue={minTicket} onChange={handleMinTicket} />

        <button type="submit">update concert</button>

         </form>

      <button type="submit" onClick={deleteConcert}>
        delete concert
      </button>
    </div>
  );
}

export default EditConcert;
