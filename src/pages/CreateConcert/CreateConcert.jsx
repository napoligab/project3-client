import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateConcert() {
  const [artist, setArtist] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [venue, setVenue] = useState('');
  const [budget, setBudget] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [minTicket, setMinTicket] = useState(0);
  const navigate = useNavigate();

  const [artists, setArtists] = useState([]);
  const [query, setQuery] = useState('');
  const [showBar, setShowBar] = useState(true);

  const getArtists = async () => {
    try {
      const response = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${query}&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json`
      );
      console.log(response.data.results.artistmatches.artist);
      setArtists(response.data.results.artistmatches.artist);
      setShowBar(false);
    } catch (error) {
      alert(error);
    }
  };

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
          Authorization: `Bearer ${token}`,
        },
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
      .post(`${process.env.REACT_APP_API_URL}/api/createconcerts`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        navigate('/concerts');
      })
      .catch((err) => console.log(err));

    setArtist('');
    setImage('');
    setDate('');
    setCity('');
    setVenue('');
    setBudget('');
    setDeadline('');
    setMinTicket('');
  };

  return (
    <div className="add-concert">
      {/* <>
        {showBar ? (
          <>
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <button onClick={() => getArtists()}>Submit</button>
          </>
        ) : (
          <></>
        )}
        {artists && (
          <>
            <select>
              {artists.map((artist) => {
                return (
                  <option
                    onClick={(e) => setQuery(e.target.value)}
                    key={artist.name}
                    value={artist.name}
                  >
                    {artist.name}
                  </option>
                );
              })}
            </select>
          </>
        )}
      </> */}
      <h3>add concert</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="artist">artist</label>
        <>
          {showBar ? (
            <>
              <input
                type="text"
                className="text-black"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
              <p onClick={() => getArtists()}>Submit</p>
            </>
          ) : (
            <></>
          )}
          {artists && (
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
        <input
          type="number"
          name="budget"
          value={budget}
          onChange={handleBudget}
        />
        <label htmlFor="deadline">deadline</label>
        <input
          type="date"
          name="deadline"
          value={deadline}
          onChange={handleDeadline}
        />
        <label htmlFor="ticket">ticket</label>
        <input
          type="number"
          name="ticket"
          value={minTicket}
          onChange={handleMinTicket}
        />
        <button type="submit">add concert</button>
      </form>
    </div>
  );
}

export default CreateConcert;
