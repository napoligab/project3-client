import axios from "axios";
import {useState, useEffect} from 'react';

function Searchbar() {
  const [concert, setConcert] = useState(null);
  const [artist, setArtist] = useState(null);
  const [input, setInput] = useState('');

 
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
        
      <input type="text" name="search" value={input} onChange={handleInput} placeholder="type artist name" /> 
       <button type="submit">search concerts</button>
      </form>
    </div>
  )
}

export default Searchbar;