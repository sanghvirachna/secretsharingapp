import React ,{useEffect, useState} from 'react'
import './Share.css';
import { getDatabase,ref,push,set,onChildAdded } from "firebase/database";
import { useAuth0 } from "@auth0/auth0-react";
import { formatDistanceToNow } from 'date-fns' // Import the function


const Share = () => {
 
  const [secrets,setSecret ] = useState([]);
  const [message,setMessage] = useState('');
  const names = ["Alien", "Martian", "Extraterrestrial", "Invader", "Outsider", "Stranger", "Foreigner", "Noncitizen", "Visitor"];
  const [showLogout, setShowLogout] = useState(false);
  const db = getDatabase();
  const { logout } = useAuth0();
  const Timestamp = Date.now();
  const getRandomName = () => {
    return names[Math.floor(Math.random() * names.length)];
  }
  const secretListRef = ref(db,'secrets')
  useEffect(() => {
    onChildAdded(secretListRef,(data) =>{
      setSecret(secrets => [...secrets, {msg: data.val().msg, name: getRandomName()}]);
    })
},[])
  const sendSecret = (msg)=>{
    const secretRef = push(secretListRef);
    set(secretRef,{
      msg
    })
    
  }
  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    
  }
  return (
    <div className='main' style={{backgroundColor: 'black'}}>
      <header>
        <div className='heading'>
          <p>You are Anonymous</p>
          <img src="https://cdn-icons-png.flaticon.com/256/1768/1768663.png" alt="secure"></img>
        </div>
        <div> 
          <img src="https://cdn-icons-png.flaticon.com/256/149/149071.png" alt="user" className='user' onClick={() => setShowLogout(!showLogout)}></img>
          {showLogout && <button className='logoutButton' onClick={handleLogout}>Logout</button>}
        </div>
      </header>
     <div className='container'>
      
      <div className='room'>
        
      {secrets.map((c,i) => <div key={i} className='secret'>
    <p>
        <div className='userprofile'>
        <img src="https://cdn-icons-png.flaticon.com/256/3177/3177440.png" alt="user" className='userimage'></img>
        <strong>{c.name}  <span>{formatDistanceToNow(Timestamp)} ago</span> </strong>
        <br></br>
        </div>
        <span className='text'>{c.msg}</span>
    </p>
</div>)}
        <div className='spacer'></div>
        <div className='btm'>
        <input type="text" placeholder='Type your secret'value={message} onInput={e => setMessage(e.target.value)} ></input>
          <a className='button' onClick={e => {
          sendSecret(message);
          setMessage('');
        } }>
      </a>
        </div>
      </div>
     </div>
    </div>
  )
}

export default Share