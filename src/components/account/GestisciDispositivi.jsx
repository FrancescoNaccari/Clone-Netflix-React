import React, { useState } from 'react';
import './Account.css'

const GestisciDispositivi = () => {
  const [dispositivi, setDispositivi] = useState([
    {
      nome: 'PC Chrome - Browser web',
      profilo: 'Nessun profilo da mostrare',
      data: '26/11/24, 12:11 GMT+1',
      attuale: true,
    },
    {
      nome: 'PC Chrome - Browser web',
      profilo: 'Concetta (ultima visione)',
      data: '26/11/24, 00:33 GMT+1',
      attuale: false,
    },
    {
      nome: 'Akai - Smart TV',
      profilo: 'Nessun profilo da mostrare',
      data: '25/11/24, 07:14 GMT+1',
      attuale: false,
    },
    {
      nome: 'Samsung - Smart TV',
      profilo: 'Tiziana (ultima visione)',
      data: '24/11/24, 23:57 GMT+1',
      attuale: false,
    },
  ]);

  const disconnettiDispositivo = (dispositivo) => {
    if (window.confirm(`Sei sicuro di voler disconnettere ${dispositivo.nome}?`)) {
      console.log(`Dispositivo disconnesso: ${dispositivo.nome}`);
      setDispositivi(dispositivi.filter((d) => d !== dispositivo));
    }
  };

  const disconnettiTutti = () => {
    if (window.confirm('Sei sicuro di voler disconnettere tutti i dispositivi?')) {
      console.log('Tutti i dispositivi disconnessi.');
      setDispositivi([]);
    }
  };

  return (
    <div className="container-fluid bg-white p-5 text-black">
      <div className="container mt-md-5 text-center">
        <div className="text-center mb-4">
          <img
            src="./assets/img_sicurezza.avif"
            alt="Shield Icon"
            className="mb-3 w-25"
          />
          <h2>Gestisci accessi e dispositivi</h2>
          <p className="text-muted">
            Questi dispositivi connessi sono stati attivi di recente su questo account.
            Puoi disconnettere i dispositivi che non riconosci o
            <a href="#" className="text-decoration-none"> cambiare la password</a> per maggiore sicurezza.
          </p>
        </div>

        <div className="row">
          {dispositivi.map((dispositivo, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="card-title mb-2">
                        <i className="bi bi-display-fill mr-2"></i>{dispositivo.nome}
                      </h5>
                      <p className="text-muted mb-1">{dispositivo.profilo}</p>
                      <p className="text-muted mb-0">
                        <i className="bi bi-clock mr-2"></i>{dispositivo.data}
                      </p>
                    </div>
                    <div>
                      {dispositivo.attuale && (
                        <span className="badge badge-primary text-dark">DISPOSITIVO ATTUALE</span>
                      )}
                      {!dispositivo.attuale && (
                        <button
                          className="btn btn-outline-danger btn-sm mt-2"
                          onClick={() => disconnettiDispositivo(dispositivo)}
                        >
                          Esci
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-outline-secondary btn-sm">Mostra altri</button>
          <p className="text-muted mt-2">
            L'elenco potrebbe non essere completo. Alcuni dispositivi e alcune attività potrebbero non essere visibili. <a href="#" className="text-decoration-none">Scopri di più</a>.
          </p>
          <button className="btn btn-danger btn-sm mt-3" onClick={disconnettiTutti}>
            Esci dall'account su tutti i dispositivi
          </button>
        </div>
      </div>
    </div>
  );
};

export default GestisciDispositivi;
