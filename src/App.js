import './App.css';
import logo from './logo.svg';
import { useAuth0 } from "@auth0/auth0-react";


function App() {
  const{user,loginWithRedirect ,isAuthenticated ,logout} = useAuth0();
  console.log(user)
  return (
    <div className="App">
      {isAuthenticated ?     <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
 : <button onClick={(e) => loginWithRedirect()}>Login with Redirect</button>}
    </div>
  );
}

export default App;
