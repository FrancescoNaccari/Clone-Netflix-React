import React from 'react';
import './Account.css'

const GestisciPagamento = () => {
  const aggiornaMetodo = () => {
    console.log('Aggiorna metodo di pagamento');
  };

  const aggiungiMetodo = () => {
    console.log('Aggiungi un nuovo metodo di pagamento');
  };

  return (
    <div className="container-fluid bg-white p-5 text-black">
      <div className="container mt-md-5 text-center">
        <div className="d-flex justify-content-center">
          <img
            src="./assets/img_sicurezza.avif"
            alt="Payment Icon"
            className="mb-4 w-25"
          />
        </div>
        <h2 className="mb-3">Gestisci metodo di pagamento</h2>
        <p className="text-muted">Stabilisci la modalità di pagamento dell'abbonamento.</p>

        <div className="card mx-auto mt-4 shadow-sm" style={{maxWidth: '600px'}}>
          <div className="card-body d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                alt="Mastercard Logo"
                style={{height: '30px', marginRight: '15px'}}
              />
              <span>Mastercard ****8523</span>
            </div>
            <div>
              <button className="btn btn-outline-primary btn-sm" onClick={aggiornaMetodo}>
                Aggiorna
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <a href="#" className="text-decoration-none" onClick={aggiungiMetodo}>
            <i className="bi bi-plus-circle"></i> Aggiungi il metodo di pagamento
          </a>
        </div>
      </div>
    </div>
  );
};

export default GestisciPagamento;
