import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-black text-light py-4">
      <div className="container">
        <p className="mb-4">Domande? Chiama il numero <a href="tel:800669767" className="text-decoration-none text-light">800669767</a></p>
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Domande frequenti</a></li>
              <li><a href="#" className="footer-link">Rapporti con gli investitori</a></li>
              <li><a href="#" className="footer-link">Come guardare Netflix</a></li>
              <li><a href="#" className="footer-link">Informazioni sull'azienda</a></li>
              <li><a href="#" className="footer-link">Note legali</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6">
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Centro assistenza</a></li>
              <li><a href="#" className="footer-link">Opportunità di lavoro</a></li>
              <li><a href="#" className="footer-link">Condizioni di utilizzo</a></li>
              <li><a href="#" className="footer-link">Contattaci</a></li>
              <li><a href="#" className="footer-link">Solo su Netflix</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6">
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Account</a></li>
              <li><a href="#" className="footer-link">Riscatta carte regalo</a></li>
              <li><a href="#" className="footer-link">Privacy</a></li>
              <li><a href="#" className="footer-link">Test di velocità</a></li>
              <li><a href="#" className="footer-link">Preferenze per la pubblicità</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6">
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Media Center</a></li>
              <li><a href="#" className="footer-link">Acquista carte regalo</a></li>
              <li><a href="#" className="footer-link">Preferenze per i cookie</a></li>
              <li><a href="#" className="footer-link">Garanzia legale</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-3 d-flex align-items-center">
          <select className="form-select bg-black text-light border-light w-auto me-3" aria-label="Lingua">
            <option selected>Italiano</option>
            <option value="1">English</option>
          </select>
          <span>Netflix Italia</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
