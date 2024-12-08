import React, { useState } from 'react';
import './Account.css'

const AggiornaPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [logoutDevices, setLogoutDevices] = useState(false);

  const modificaPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Le nuove password non corrispondono.');
      return;
    }
    console.log('Password aggiornata con successo:', {
      currentPassword,
      newPassword,
      logoutDevices,
    });
  };

  const annulla = () => {
    console.log('Operazione annullata.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setLogoutDevices(false);
  };

  return (
    <div className="container-fluid bg-white p-md-5 text-black">
      <div className="container py-5">
        <h2 className="mb-4">Modifica password</h2>
        <p className="text-muted">
          Proteggi il tuo account con una password unica di almeno 6 caratteri.
        </p>

        <form onSubmit={modificaPassword}>
          <div className="form-group">
            <label htmlFor="currentPassword">Password attuale</label>
            <input
              type="password"
              className="form-control"
              id="currentPassword"
              placeholder="Password attuale"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <a href="#" className="small text-decoration-none">Hai dimenticato la password?</a>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="newPassword">Nuova password (6-60 caratteri)</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Nuova password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={6}
              maxLength={60}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="confirmPassword">Reinserisci la nuova password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Reinserisci la nuova password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-check mt-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="logoutDevices"
              checked={logoutDevices}
              onChange={(e) => setLogoutDevices(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="logoutDevices">
              Esci dall'account su tutti i dispositivi
            </label>
          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-primary me-3">Salva</button>
            <button type="button" className="btn btn-secondary ml-2" onClick={annulla}>Annulla</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AggiornaPassword;
