import React, { useState } from 'react';
import './Account.css'

const ModificaPiano = () => {
  const [selezione, setSelezione] = useState(null);

  const scegliPiano = (piano) => {
    setSelezione(piano);
    console.log(`Hai selezionato il piano: ${piano}`);
  };

  return (
    <div className="container-fluid bg-white p-5 text-black">
      <div className="container pt-md-5 px-5 bg-white">
        <h2 className="mb-3 pt-5">Modifica piano</h2>
        <p className="text-muted">
          Goditi intrattenimento, giochi ed eventi in diretta illimitati con ogni piano.
        </p>

        <div className="card mb-4 border-primary">
          <div className="card-body">
            <div className="premium-card">
              <div className="label">Massima qualità</div>
              <div className="title">Premium</div>
              <div className="d-flex justify-content-between align-content-center">
                <div className="description text-center">4K + HDR</div>
                <div className="price">19,99 €/mese</div>
              </div>
            </div>

            <p className="card-text mt-3">
              <i className="bi bi-check-circle-fill text-success"></i> Massima qualità audio e video
            </p>
            <p className="card-text">
              <i className="bi bi-check-circle-fill text-success"></i> Guarda senza pubblicità
            </p>
            <p className="card-text">
              <i className="bi bi-check-circle-fill text-success"></i> Scarica su 6 dispositivi
            </p>
          </div>
        </div>

        <h5 className="mb-3">Scegli un piano da confrontare</h5>
        <div className="list-group mb-4">
          <label className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <input type="radio" name="piano" className="form-check-input mr-3 me-2" onChange={() => scegliPiano('Standard')} />
              <span>Standard</span>
              <p className="mb-0 text-muted">1080p</p>
            </div>
            <span>13,99 €/mese</span>
          </label>
          <label className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <input type="radio" name="piano" className="form-check-input mr-3 me-2" onChange={() => scegliPiano('Standard con pubblicità')} />
              <span>Standard con pubblicità</span>
              <p className="mb-0 text-muted">1080p</p>
            </div>
            <span>6,99 €/mese</span>
          </label>
        </div>

        <p className="text-muted">
          La disponibilità di Full HD (1080p), Ultra HD (4K) e HDR dipende dalla tua connessione Internet e dalle capacità del tuo dispositivo. Non tutti i contenuti sono disponibili in tutte le risoluzioni. Per ulteriori dettagli leggi le nostre <a href="#" className="text-decoration-none">Condizioni di utilizzo</a>.
        </p>

        <button className="btn btn-primary btn-lg btn-block mb-5" disabled={!selezione}>Continua e confronta</button>
      </div>
    </div>
  );
};

export default ModificaPiano;
