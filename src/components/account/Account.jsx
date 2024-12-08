import React from 'react';
import { Link } from 'react-router-dom';
import './Account.css'
const Account = () => {
  const pianoAbbonamento = {
    nome: 'Piano Premium',
    prossimoPagamento: '23 dicembre 2024',
    metodoPagamento: '**** 8523',
  };

  return (
    <div className="container-fluid bg-white py-5 text-black">
      <div className="container mt-md-5">
        <h2 className="mb-4">Account</h2>

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-light d-flex justify-content-between align-items-center">
            <span>Dettagli abbonamento</span>
            <span className="badge badge-danger">Inizio abbonamento: agosto 2024</span>
          </div>
          <div className="card-body">
            <h5>{pianoAbbonamento.nome}</h5>
            <p className="text-muted">Prossimo pagamento: {pianoAbbonamento.prossimoPagamento}</p>
            <div className="d-flex align-items-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                alt="Mastercard Logo"
                style={{height: '20px', marginRight: '10px'}}
              />
              <span>{pianoAbbonamento.metodoPagamento}</span>
            </div>
            <Link 
              to="/sidebar/abbonamento" 
              className="list-group-item list-group-item-action d-flex justify-content-between py-2 mt-3 align-items-center text-decoration-none text-black"
            >
              <span>Gestisci abbonamento</span> <i className="bi bi-chevron-right"></i>
            </Link>
          </div>
        </div>

        <h5 className="mb-3">Link rapidi</h5>
        <div className="list-group">
          <Link 
            to="/sidebar/modificaPiano" 
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-black text-decoration-none"
          >
            <span><i className="bi bi-pencil-square mr-2"></i> Modifica piano</span>
            <i className="bi bi-chevron-right"></i>
          </Link>

          <Link 
            to="/sidebar/gestisciPagamenti" 
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-black text-decoration-none"
          >
            <span><i className="bi bi-credit-card mr-2"></i> Gestisci metodo di pagamento</span>
            <i className="bi bi-chevron-right"></i>
          </Link>

          <Link 
            to="/sidebar/utenteExtra" 
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-black text-decoration-none"
          >
            <span>
              <i className="bi bi-people mr-2"></i> Acquista uno slot per utente extra
              <span className="badge badge-primary ml-2">Nuovo</span>
            </span>
            <i className="bi bi-chevron-right"></i>
          </Link>

          <Link 
            to="/sidebar/gestisciDispositivi" 
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-black text-decoration-none"
          >
            <span><i className="bi bi-display mr-2"></i> Gestisci accessi e dispositivi</span>
            <i className="bi bi-chevron-right"></i>
          </Link>

          <Link 
            to="/sidebar/aggiornaPassword" 
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-black text-decoration-none"
          >
            <span><i className="bi bi-key-fill mr-2"></i> Aggiorna la password</span>
            <i className="bi bi-chevron-right"></i>
          </Link>

          <a 
            href="#" 
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-black text-decoration-none"
          >
            <span><i className="bi bi-arrow-right-square mr-2"></i> Trasferisci un profilo</span>
            <i className="bi bi-chevron-right"></i>
          </a>

          <a 
            href="#" 
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-black text-decoration-none"
          >
            <span><i className="bi bi-sliders mr-2"></i> Modifica filtro famiglia</span>
            <i className="bi bi-chevron-right"></i>
          </a>

          <Link 
            to="/sidebar/impostazioni" 
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-black text-decoration-none"
          >
            <span>
              <i className="bi bi-gear-fill mr-2"></i> Modifica impostazioni
            </span>
            <i className="bi bi-chevron-right"></i>
          </Link>
        </div>

        <div className="list-group mt-2">
          <Link 
            to="/sidebar/profilo" 
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-black text-decoration-none"
          >
            <div>
              <h5 className="m-0">Gestisci i profili</h5>
              <p className="p-0 m-0">5 profili</p>
            </div>
            <i className="bi bi-chevron-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Account;
