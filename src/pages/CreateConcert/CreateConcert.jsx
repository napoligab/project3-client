import { useState } from 'react';
import axios from 'axios';
import React from 'react';

function CreateConcert({ getConcerts }) {
  const [artist, setArtist] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [venue, setVenue] = useState('');
  const [budget, setBudget] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [ticket, setTicket] = useState(0);

  const [artists, setArtists] = useState([]);
  const [query, setQuery] = useState('');
  const [showBar, setShowBar] = useState(true);

  const getArtists = async () => {
    try {
      const response = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${query}&api_key=59f3ecc4af95e20ed1f8a92aeecba469&format=json`
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
  const handleTicket = (e) => setTicket(e.target.value);
  // Dont forget xico
  //url => http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=YOUR_API_KEY&format=json

  const handleImage = (e) => {
    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData)
      .then((response) => {
        setImage(response.data.fileUrl);
        console.log(response.data.fileUrl);
      })
      .catch((err) => console.log('Error while uploading the file: ', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { artist, image, date, city, venue, budget, deadline, ticket };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/concerts`, body)
      .then(() => {
        getConcerts();
      })
      .catch((err) => console.log(err));

    setArtist('');
    setImage('');
    setDate('');
    setCity('');
    setVenue('');
    setBudget('');
    setDeadline('');
    setTicket('');
  };

  return (
    <div className="AddProject">
      <>
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
      </>
      <h3>Add Concert</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="artist">artist</label>
        <input
          type="text"
          name="artist"
          value={artist}
          onChange={handleArtist}
        />

        <label htmlFor="image">Description</label>
        <input type="file" name="image" onChange={handleImage} />

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
          value={ticket}
          onChange={handleTicket}
        />

        <button type="submit">Add Project</button>
      </form>
    </div>
  );
}

export default CreateConcert;
