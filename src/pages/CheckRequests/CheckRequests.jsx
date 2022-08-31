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
          <div className="concert-card" key={message._id}>
             {/*  <h4>{message.user.firsName}</h4>
              <h4>{message.user.lastName}</h4>
              <h4>{message.user.email}</h4> */}
              <h4>{message.message}</h4>
           </div>
        )
    })}
    
    </div>
  )
}

export default CheckRequests