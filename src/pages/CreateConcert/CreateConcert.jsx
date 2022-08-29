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

  const handleArtist = (e) => setArtist(e.target.value);
  const handleImage = (e) => setImage(e.target.value);
  const handleDate = (e) => setDate(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleVenue = (e) => setVenue(e.target.value);
  const handleBudget = (e) => setBudget(e.target.value);
  const handleDeadline = (e) => setDeadline(e.target.value);
  const handleTicket = (e) => setTicket(e.target.value);

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
      <h3>Add Concert</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="artist">artist</label>
        <input
          type="text"
          name="artist"
          value={artist}
          onChange={handleArtist}
        />

        <label htmlFor="image">aescription</label>
        <input type="file" name="image" value={image} onChange={handleImage} />

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
