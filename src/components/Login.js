import React from 'react'
import LoginAnimation from './LoginAnimation'
import './Login.css'
import { useAuth0 } from "@auth0/auth0-react";
const Login = () => {
    const {  loginWithRedirect } = useAuth0();

    return (
        <div>
            <LoginAnimation />
            <div className="app-title">
                <p>Secret Sharing App</p>
            </div>
            <div className='login'>
                <div className='heading'>👽 Welcome, Alien! 🚀</div>
                <span className='share'>🤫 Share Your Secrets Anonymously</span>
                <div className='get'>What you get ? </div>
                <p>🛡️ Security & Privacy</p>
                <p>🤝 Connect Anonymously</p>
                <p>No Judgments, Just Understanding🤝✨</p>
                <h4>Get Started by clicking on button below</h4>
                <button onClick={() => loginWithRedirect()}>Log in</button>
                <div className='box'>
                <div className='works'>🌐 How It Works
                    <p>1. Submit Anonymously</p>   
                    <p>2. Discover Others' Secrets</p>
                    <p>3. Supportive Community</p>
                </div>
                </div>
                
            </div>
        </div>
    )
}

export default Login