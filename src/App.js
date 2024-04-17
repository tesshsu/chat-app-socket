import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';


const socket = io("http://localhost:3000");

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  
  useEffect(() => {
     socket.on('message', ({ name, message }) => {
         setChat([...chat,  { name, message }]);
     }); 
  }, [chat]);
  
  const onTextChange = e => {
    if(e.target.name === 'name') {
      setName(e.target.value);
      //console.log(e.target.value);
    }else {
      setMessage(e.target.value);
    }
  }

  const onMessageSubmit = e => {
    e.preventDefault();

    const messageData = { name, message };
    // send to socket message
    socket.send('message', messageData);
    setMessage('');
  }

  return (
    <div>
      <form onSubmit={onMessageSubmit}>
        <p>Send your message</p>
        <div>
          <input name='name' onChange={onTextChange} value={name} placeholder="Name" />
          <textarea name='message' onChange={onTextChange} value={message} placeholder="Message" />        
        </div>
        <button>Submit</button>
      </form>
      <div>
        {chat.map(({ name, message }, index) => (
           <div key={index}>
            <p>{name} : <span>{message}</span></p>
           </div>
        ))}
      </div>

    </div>
  );
}

export default App;
