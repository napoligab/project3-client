import axios from "axios";
import {useState, useEffect} from 'react';

function CheckRequests() {
    const [messages, setMessages] = useState([]);
  

    const getMessages = async () => {
        try {
          const token = localStorage.getItem('authToken');

          let response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/request`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          setMessages(response.data);
        } catch (err) {
          console.log(err);
        }
      };
    
      useEffect(() => {
        getMessages();
      }, []);

  return (
    <div>

    <h2>check requests</h2>

    {messages.map((message) => {
        return (
          <div className="concert-card mt-4" key={message._id}>
              <h4><b>request by: {message.author.email}</b></h4> 
              <p> {message.message}</p>
           </div>
        )
    })}
    
    </div>
  )
}

export default CheckRequests;