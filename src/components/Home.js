import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

const Home = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  
  console.log(user)
  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
          <Link to="/share">Go to Secrets Room</Link>
          
        </>
      ) : (
        <button onClick={loginWithRedirect}>Login with Redirect</button>
      )}
    </div>
  );
}

export default Home;