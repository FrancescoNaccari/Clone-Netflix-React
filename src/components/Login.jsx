import React, { useState, useEffect } from 'react';
import AuthService from '../services/authService'; 
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    loadGoogleScript().then(() => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: 'inserire id google',
          callback: handleCredentialResponse,
        });

        const buttonDiv = document.getElementById('buttonDiv');
        if (buttonDiv) {
          window.google.accounts.id.renderButton(buttonDiv, {
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            shape: 'pill',
          });
          window.google.accounts.id.prompt(); // Mostra il dialogo One Tap
        }
      }
    }).catch((error) => console.error('Errore nel caricamento di Google:', error));
  }, []);

  const onLogin = async (e) => {
    e.preventDefault();
    const credentials = { email, password };
    try {
      const response = await AuthService.login(credentials);
      console.log('Login riuscito:', response);
    } catch (err) {
      console.error('Errore durante il login:', err);
    }
  };

  const handleCredentialResponse = async (response) => {
    if (response?.credential) {
      try {
        const result = await AuthService.loginWithGoogle(response.credential);
        console.log('Login con Google riuscito:', result);
      } catch (err) {
        console.error('Errore durante il login con Google:', err);
      }
    } else {
      console.error('Risposta non valida da Google:', response);
    }
  };

  const loadGoogleScript = () => {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject('Errore nel caricamento dello script Google');
      document.head.appendChild(script);
    });
  };

  return (
    <div className="login-container">
    <div className="login-card">
      <h3 className="text-center mb-4 ">Accedi</h3>
      <form onSubmit={onLogin}>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label ">Indirizzo email o numero di cellulare</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control bg-dark text-white border-1 border-white bg-opacity-50"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control bg-dark text-white border-1 border-white bg-opacity-50"
            required
          />
        </div>
        <button type="submit" className="btn btn-danger w-100 mb-3">Accedi</button>
      </form>
      <a href="#" className="text-light d-block text-center">Hai dimenticato la password?</a>
      <div className="form-check mt-3">
        <input className="form-check-input" type="checkbox" id="rememberMe" />
        <label className="form-check-label" htmlFor="rememberMe">Ricordami</label>
      </div>
      <div className="mt-4 text-center">
        <span>Prima volta su Netflix? <a href="#" className="text-white">Registrati.</a></span>
      </div>
      <div className="mt-3 text-center text-light" style={{ fontSize: '0.8rem' }}>
        Questa pagina è protetta da Google reCAPTCHA per garantire che tu non sia un bot.
      </div>
    </div>
  </div>
  
  );
};

export default Login;
