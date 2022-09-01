import axios from "axios";
import {useState, useEffect} from 'react';

function Searchbar() {
  const [concert, setConcert] = useState(null);
  const [artist, setArtist] = useState(null);
  const [input, setInput] = useState('');


  //fazer um loop nos concerts e filtrar os que dão match no nome do artista
 
   const handleInput = (e) => setInput(e.target.value);

   const handleSubmit = (e) => {
    e.preventDefault();
    console.log('sent');
    setArtist(input);
   }
  
  const getConcert = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/concerts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      setConcert(response.data);
      
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getConcert();
  }, [artist])

  return (
    <div>
{/* <label htmlFor="artist">artist</label>
        <>
          {showBar ? (
            <>
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
             {/*  <p onClick={() => getArtists()}>Submit</p> 
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
       <form onSubmit={handleSubmit}>
        
      <input className="text-black" type="text" name="search" value={input} onChange={handleInput} placeholder="type artist name" /> 
       <button type="submit">search concerts</button>
      </form>

    {concert && (
       <>
       <h3>{concert.artist}</h3>
              <img className="artist-pic" src={concert.image} alt="artist" />
             {/*  <h4>{concert.date.slice(0, 10).split('-').reverse().join('/')}</h4> */}
              <h4>{concert.city}</h4>
              <h4>{concert.venue}</h4>
              <h4>{concert.budget}€</h4>
              <h4>{concert.minTicket}€</h4>
              {/* <h4>{concert.usersFunding.length}</h4> */}

       </>

    )}
    </div>
  )
}

export default Searchbar;