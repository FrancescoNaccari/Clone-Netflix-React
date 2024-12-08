// src/components/account/Sidebar.js
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="container-fluid p-0">
      <div className="d-flex">
        {/* Sidebar (per dispositivi grandi) */}
        <div className="sidebar bg-light p-3 d-none mt-5 pt-5 d-md-block">
          <div className="mb-4">
            <NavLink to="/" className="text-decoration-none  d-flex align-items-center ms-3">
              <i className="bi bi-arrow-left mr-2"></i> Torna su Netflix
            </NavLink>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <NavLink className="nav-link text-dark" to="/sidebar/account">
                <i className="bi bi-house-fill mr-2"></i> Account
              </NavLink>
            </li>
            <li className="nav-item mb-3">
              <NavLink className="nav-link text-dark" to="/sidebar/abbonamento">
                <i className="bi bi-card-list mr-2"></i> Abbonamento
              </NavLink>
            </li>
            <li className="nav-item mb-3">
              <NavLink className="nav-link text-dark" to="/sidebar/sicurezza">
                <i className="bi bi-shield-lock-fill mr-2"></i> Sicurezza
              </NavLink>
            </li>
            <li className="nav-item mb-3">
              <NavLink className="nav-link text-dark" to="/sidebar/gestisciDispositivi">
                <i className="bi bi-display-fill mr-2"></i> Dispositivi
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-dark" to="/sidebar/profilo">
                <i className="bi bi-people-fill mr-2"></i> Profili
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contenuto principale */}
        <div className="content flex-grow-1 p-0 pt-5">
          {/* Barra di navigazione orizzontale (per dispositivi piccoli) */}
          <div className="navigation-bar bg-light d-md-none mt-4">
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <NavLink className="nav-link" to="/sidebar/account">Account</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sidebar/abbonamento">Abbonamento</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sidebar/sicurezza">Sicurezza</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sidebar/gestisciDispositivi">Dispositivi</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sidebar/profilo">Profili</NavLink>
              </li>
            </ul>
          </div>

          {/* Outlet per le rotte annidate */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
