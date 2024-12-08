import React from 'react';
import { Link } from 'react-router-dom';
import './Account.css'

const Abbonamento = () => {
  const prossimoPagamento = '23 dicembre 2024';

  const disdiciAbbonamento = () => {
    if (window.confirm('Sei sicuro di voler disdire l’abbonamento?')) {
      console.log('Abbonamento disdetto.');
    }
  };

  return (
    <div className="container-fluid p-5 bg-white">
      <div className="container mt-md-5 text-black">
        <h2 className="mb-4">Abbonamento</h2>

        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h4 className="mb-3">Piano Premium</h4>
            <p className="text-muted">
              Risoluzione video 4K con audio spaziale, visione senza pubblicità e molto altro.
            </p>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/modifica-piano" className="d-flex justify-content-between align-items-center text-decoration-none text-black">
                  <span>Modifica piano</span>
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link to="/acquista-slot" className="d-flex justify-content-between align-items-center text-decoration-none text-black">
                  <span>Acquista uno slot per utente extra</span>
                  <span className="badge badge-primary">Nuovo</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="mb-3">Dati di pagamento</h5>
            <div className="mb-3">
              <p className="mb-1">Prossimo pagamento</p>
              <p className="text-muted">{prossimoPagamento}</p>
              <p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                  alt="Mastercard Logo"
                  style={{height: '20px', marginRight: '10px'}}
                />
                **** 8523
              </p>
            </div>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/gestisci-metodo-pagamento" className="d-flex justify-content-between align-items-center text-decoration-none text-black">
                  <span>Gestisci metodo di pagamento</span>
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/riscatta-codice" className="d-flex justify-content-between align-items-center text-decoration-none text-black">
                  <span>Riscatta codice regalo o promozionale</span>
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link to="/cronologia-pagamenti" className="d-flex justify-content-between align-items-center text-decoration-none text-black">
                  <span>Visualizza cronologia dei pagamenti</span>
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <button className="btn btn-danger btn-sm" onClick={disdiciAbbonamento}>Disdici abbonamento</button>
        </div>
      </div>
    </div>
  );
};

export default Abbonamento;
