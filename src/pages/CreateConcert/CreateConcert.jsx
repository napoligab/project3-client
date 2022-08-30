import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreateConcert({ getConcerts }) {
  const [artist, setArtist] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [venue, setVenue] = useState('');
  const [budget, setBudget] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [minticket, setMinTicket] = useState(0);
  const navigate = useNavigate();


  const handleArtist = (e) => setArtist(e.target.value);
  const handleDate = (e) => setDate(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleVenue = (e) => setVenue(e.target.value);
  const handleBudget = (e) => setBudget(e.target.value);
  const handleDeadline = (e) => setDeadline(e.target.value);
  const handleMinTicket = (e) => setMinTicket(e.target.value);
  // Dont forget xico
  //url => http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=YOUR_API_KEY&format=json

  const handleImageUrl = (e) => {
    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData)
      .then((response) => {
        setImageUrl(response.data.fileUrl);
        console.log(response.data.fileUrl);
      })
      .catch((err) => console.log('Error while uploading the file: ', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { artist, imageUrl, date, city, venue, budget, deadline, minticket };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/concerts`, body)
      .then(() => {
        getConcerts();
        navigate('/concerts')
      })
      .catch((err) => console.log(err));

    setArtist('');
    setImageUrl('');
    setDate('');
    setCity('');
    setVenue('');
    setBudget('');
    setDeadline('');
    setMinTicket('');
  };

  return (
    <div className="AddProject">
      <h3>create concert</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="artist">artist</label>
        <input
          type="text"
          name="artist"
          value={artist}
          onChange={handleArtist}
        />

        <label htmlFor="imageUrl">Description</label>
        <input type="file" name="imageUrl" onChange={handleImageUrl} />

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
          value={minticket}
          onChange={handleMinTicket}
        />

        <button type="submit">add concert</button>
      </form>
    </div>
  );
}

export default CreateConcert;
