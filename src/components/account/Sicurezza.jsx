import React from 'react';
import './Account.css'

const Sicurezza = () => {
  const verificaNumero = () => {
    console.log('Verifica del numero di telefono avviata.');
  };

  const eliminaAccount = () => {
    if (window.confirm('Sei sicuro di voler eliminare il tuo account?')) {
      console.log('Account eliminato.');
    }
  };

  return (
    <div className="container-fluid bg-white py-5 text-black">
      <div className="container mt-md-5">
        <div className="alert alert-warning d-flex align-items-center" role="alert">
          <i className="bi bi-info-circle-fill mr-2"></i>
          <span>
            Verifica il tuo numero di cellulare. La verifica del numero di telefono aumenta la sicurezza e può aiutarti ad accedere e a recuperare l'account. <a href="#" className="text-decoration-none" onClick={verificaNumero}>Verifica adesso</a>.
          </span>
        </div>

        <h2 className="mb-4">Sicurezza</h2>

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-light">Dettagli account</div>
          <div className="list-group list-group-flush">
            <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <span><i className="bi bi-lock-fill mr-2"></i> Password</span>
              <i className="bi bi-chevron-right"></i>
            </a>
            <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <span><i className="bi bi-envelope-fill mr-2"></i> Email</span>
              <span className="text-danger">Verifica necessaria</span>
            </a>
            <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <span><i className="bi bi-phone-fill mr-2"></i> Cellulare</span>
              <span className="text-danger">Verifica necessaria</span>
            </a>
          </div>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-light">Accesso e privacy</div>
          <div className="list-group list-group-flush">
            <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <span><i className="bi bi-display-fill mr-2"></i> Accesso e dispositivi</span>
              <i className="bi bi-chevron-right"></i>
            </a>
            <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <span><i className="bi bi-arrow-right-square-fill mr-2"></i> Trasferimenti di profilo</span>
              <span className="badge badge-primary">Nuovo</span>
            </a>
            <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <span><i className="bi bi-person-lines-fill mr-2"></i> Accesso ai dati personali</span>
              <span>On</span>
            </a>
            <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <span><i className="bi bi-tools mr-2"></i> Test delle funzionalità</span>
              <span>On</span>
            </a>
          </div>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-danger btn-sm" onClick={eliminaAccount}>Elimina account</button>
        </div>
      </div>
    </div>
  );
};

export default Sicurezza;
