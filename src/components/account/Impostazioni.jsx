import React, { useState } from 'react';
import './Account.css'

const Impostazioni = () => {
  const [animazioni, setAnimazioni] = useState(false);

  const eliminaProfilo = () => {
    const conferma = window.confirm('Sei sicuro di voler eliminare questo profilo?');
    if (conferma) {
      console.log('Profilo eliminato.');
    }
  };

  return (
    <div className="container-fluid bg-white p-5 text-black">
      <div className="container mt-md-5">
        <h2 className="mb-4 text-center">Gestisci profili e preferenze</h2>

        <div className="card mb-4 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title mb-1"><i className="bi bi-person-circle mr-2"></i> Salvo</h5>
              <p className="text-muted mb-0">Modifica recapiti e dati personali</p>
            </div>
            <div>
              <button className="btn btn-outline-secondary btn-sm">Modifica</button>
            </div>
          </div>
        </div>

        <div className="card mb-4 shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title mb-1"><i className="bi bi-lock-fill mr-2"></i> Blocco profilo</h5>
              <p className="text-muted mb-0">Richiedi un PIN per accedere al profilo</p>
            </div>
            <div>
              <button className="btn btn-outline-secondary btn-sm">Imposta</button>
            </div>
          </div>
        </div>

        <h5 className="mb-3">Preferenze</h5>
        <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <span><i className="bi bi-translate mr-2"></i> Lingue</span>
            <i className="bi bi-chevron-right"></i>
          </a>
          {/* Aggiungi gli altri link allo stesso modo */}
          <div className="list-group-item d-flex justify-content-between align-items-center">
            <span><i className="bi bi-tv-fill mr-2"></i> Effetti di animazione su TV</span>
            <div>
              <input type="checkbox" id="animazioni" checked={animazioni} onChange={(e) => setAnimazioni(e.target.checked)} />
            </div>
          </div>
          {/* ... altri link */}
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-danger btn-sm" onClick={eliminaProfilo}>
            <i className="bi bi-trash-fill mr-2"></i> Elimina profilo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Impostazioni;
