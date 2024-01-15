import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Share from './Share';
import Login from './Login';

const Home = () => {
  const { user,  isAuthenticated } = useAuth0();
  
  console.log(user)
  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <Share />
          
        </>
      ) : (
        
        <Login />
      )}
    </div>
  );
}

export default Home;