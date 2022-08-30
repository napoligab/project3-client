import axios from 'axios';
import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';


function EditConcert() {
    const [artist, setArtist] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [date, setDate] = useState('');
    const [city, setCity] = useState('');
    const [venue, setVenue] = useState('');
    const [budget, setBudget] = useState(0);
    const [deadline, setDeadline] = useState('');
    const [minTicket, setMinTicket] = useState(0);
    const {concertId} = useParams();
    const navigate = useNavigate();

    const getConcert = async () => {
        try {

            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/concerts/{concertId}`);
            setArtist(response.data.artist);
            setImageUrl(response.data.image);
            setDate(response.data.date);
            setCity(response.data.city);
            setDate(response.data.venue);
            setDate(response.data.budget);
            setDate(response.data.deadline);
            setDate(response.data.ticket);
        }
        catch(err) {
            console.log(err.response.data.errorMessage)
        }
    };

    useEffect(() => {
        getConcert();
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
    
        const body = { artist, venue, city, date, budget, deadline, minTicket, imageUrl };
        
        axios
          .put(`${process.env.REACT_APP_API_URL}/api/concerts/{concertId}/edit`, body)
          .then(() => {
            setArtist('');
            setImageUrl('');
            setDate('');
            setCity('');
            setVenue('');
            setBudget('');
            setDeadline('');
            setMinTicket('');
            navigate('/concerts')
          })
          .catch((err) => console.log(err));
      };

        const deleteConcert = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/concerts/${concertId}`)
        .then(()=> navigate('/'))
        .catch((err) => console.log(err));
     }
    
      return (
        <div className="edit-concertct">
          <h3>edit concert</h3>
    
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
    
            <label htmlFor="ticket">min ticket</label>
            <input
              type="number"
              name="ticket"
              value={minTicket}
              onChange={handleMinTicket}
            />
    
            <button type="submit">update concert</button>
         </form>

            <button type="submit" onClick={deleteConcert}>delete concert</button>

        </div>
      );
    }

export default EditConcert;