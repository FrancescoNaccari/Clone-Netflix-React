import React from 'react';
import './Account.css'

const UtenteExtra = () => {
  const acquistaSlot = () => {
    console.log('Slot utente extra acquistato.');
    // Qui puoi aggiungere la logica per effettuare una richiesta al server e completare l’acquisto.
  };

  return (
    <div className="container-fluid bg-white p-5 text-black">
      <div className="container mt-md-5">
        <h2 className="mb-4">Acquista uno slot per utente extra</h2>
        <p className="text-muted">
          Aggiungi uno slot per un utente extra al tuo abbonamento. In questo modo potrai condividere il tuo account con una persona in più.
        </p>
        
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h4 className="mb-3">Dettagli Slot Utente Extra</h4>
            <ul className="list-unstyled mb-3">
              <li><i className="bi bi-check-circle-fill text-success mr-2"></i> Accesso completo ai contenuti</li>
              <li><i className="bi bi-check-circle-fill text-success mr-2"></i> Visualizzazione su dispositivi aggiuntivi</li>
              <li><i className="bi bi-check-circle-fill text-success mr-2"></i> Possibilità di impostare un profilo separato</li>
            </ul>
            <p className="mb-4"><strong>Prezzo:</strong> 4,99 €/mese</p>
            <button className="btn btn-primary" onClick={acquistaSlot}>Acquista slot extra</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtenteExtra;
