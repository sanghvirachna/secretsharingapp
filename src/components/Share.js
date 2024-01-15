import React ,{useEffect, useState} from 'react'
import './Share.css';
import { getDatabase,ref,push,set,onChildAdded } from "firebase/database";
import Button from '@material-ui/core/Button';
import { useAuth0 } from "@auth0/auth0-react";
import { formatDistanceToNow } from 'date-fns' // Import the function
import SendIcon from '@material-ui/icons/Send';


const Share = () => {
 
  const [secrets,setSecret ] = useState([]);
  const [message,setMessage] = useState('');
  const names = ["Alien", "Martian", "Extraterrestrial", "Invader", "Outsider", "Stranger", "Foreigner", "Noncitizen", "Visitor"];
  const [showLogout, setShowLogout] = useState(false);
  const db = getDatabase();
  const { logout } = useAuth0();
  const randomTimestamp = Date.now() - Math.floor(Math.random() * 1000000000);
  const getRandomName = () => {
    return names[Math.floor(Math.random() * names.length)];
  }
  const secretListRef = ref(db,'secrets')
  useEffect(() => {
    onChildAdded(secretListRef,(data) =>{
      setSecret(secrets => [...secrets,data.val().msg]);
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
    // navigate('/')
  }
  return (
    <div>
      <header>
        <div className='heading'>
          <p>Your are Anonymous</p>
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
          <p >
            <div className='userprofile'>
            <img src="https://cdn-icons-png.flaticon.com/256/3177/3177440.png" className='userimage'></img>
            <strong>{getRandomName()}  <span>{formatDistanceToNow(randomTimestamp)} ago</span> </strong>
           
<br></br>
            </div>
            <span className='text'>{c}</span>
          </p>

        </div>)}
       
        <div className='btm'>
        {/* <TextField id="outlined-basic"  variant="outlined" placeholder='Type your secret'value={message} onInput={e => setMessage(e.target.value)}/> */}
        <input type="text" placeholder='Type your secret'value={message} onInput={e => setMessage(e.target.value)} ></input>
          <Button variant="contained" endIcon={<SendIcon />} onClick={e => {
          sendSecret(message);
          setMessage('');
        } }>
      </Button>
        </div>
      </div>
     </div>
    </div>
  )
}

export default Share