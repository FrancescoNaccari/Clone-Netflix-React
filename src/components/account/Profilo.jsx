import React from 'react';
import './Account.css'

const Profile = () => {
  const profili = [
    { nome: 'Vincenzo', colore: '#007bff', tuo: false },
    { nome: 'Tiziana', colore: '#ffc107', tuo: false },
    { nome: 'Salvo', colore: '#dc3545', tuo: true },
    { nome: 'Concetta', colore: '#343a40', tuo: false },
    { nome: 'Massimo', colore: '#28a745', tuo: false },
  ];

  return (
    <div className="container-fluid bg-white p-5 text-black d-flex justify-content-center">
      <div className="container m-md-5 ">
        <h2 className="mb-4 fw-bolder">Profili</h2>

        <h5 className="mb-3">Filtro famiglia e autorizzazioni</h5>
        <div className="card mb-4 shadow-sm">
          <div className="list-group list-group-flush">
            <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <span><i className="bi bi-shield-lock-fill mr-2"></i> Modifica filtro famiglia</span>
              <i className="bi bi-chevron-right"></i>
            </a>
            <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <span><i className="bi bi-arrow-right-square-fill mr-2"></i> Trasferisci un profilo</span>
              <i className="bi bi-chevron-right"></i>
            </a>
          </div>
        </div>

        <h5 className="mb-3">Impostazioni del profilo</h5>
        <div className="list-group">
          {profili.map((profilo, index) => (
            <div
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle mr-3 me-3"
                  style={{ backgroundColor: profilo.colore, width: '40px', height: '40px' }}
                ></div>
                <span>{profilo.nome}</span>
              </div>
              <div>
                {profilo.tuo && <span className="badge badge-primary mr-2">Il tuo profilo</span>}
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
