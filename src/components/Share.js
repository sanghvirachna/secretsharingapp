import React ,{useEffect, useState} from 'react'
import './Share.css';
import { getDatabase,ref,push,set,onChildAdded } from "firebase/database";

const Share = () => {
  const [secrets,setSecret ] = useState(["hello"]);
  const [message,setMessage] = useState('');
  const db = getDatabase();
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
  return (
    <div>
      <header>
        <div className='heading'>
          <p>Your identity is completely protected </p>
          <img src="https://cdn-icons-png.flaticon.com/256/2592/2592317.png" alt="secure"></img>
        </div>
        <img src="https://cdn-icons-png.flaticon.com/256/149/149071.png" alt="user" className='user'></img>
      </header>
      <div >
        <h1>Secret sharing room</h1>
        <div>
        {secrets.map((c,i) => <div key={i}>
          <p>
            <strong>Anonymous User</strong><br></br>
            <span>{c}</span>
          </p>

        </div>)}
        </div>
        <div className='btm'>
        <input type="text" placeholder='Type your secret'value={message} onInput={e => setMessage(e.target.value)} ></input>
        <button onClick={e => {
          sendSecret(message);
          setMessage('');
        } }>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Share
