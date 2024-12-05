import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useFilter } from '../context/FilterContext';  
import AuthService from '../services/authService';
import { MoviesService } from '../services/moviesService'; 
import './Navbar.css';
import logo from '../assets/logo_netflix.png';
import avatar from '../assets/userAvatar.png';
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { filter, setFilter } = useFilter(); 
  const navigate = useNavigate();

  const authSrv = new AuthService(); 

  const logout = () => {
    authSrv.logout();
    navigate('/');
  };

  const handleFilterChange = (filter) => {
    setFilter(filter); 
    navigate('/home'); 
  };

  const searchMovies = () => {
    if (searchQuery.trim()) {
      MoviesService.searchMovies(searchQuery) // Usa direttamente MoviesService senza 'new'
        .then(response => {
          console.log('Risultati della ricerca:', response.results);
          navigate('/search', { state: { query: searchQuery } });
        })
        .catch(error => {
          console.error('Errore nella ricerca:', error);
        });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="/" onClick={(e) => navigate('/')}>
          <img src={logo} alt="Netflix" style={{ height: '50px' }} />
        </a>

        {/* Menu Toggler per dispositivi mobili */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links della navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a
                className={`nav-link ${filter === 'all' ? 'active' : ''}`}
                href="/home"
                onClick={() => handleFilterChange('all')}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${filter === 'tvshows' ? 'active' : ''}`}
                href="/home"
                onClick={() => handleFilterChange('tvshows')}
              >
                Serie TV
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${filter === 'movies' ? 'active' : ''}`}
                href="/home"
                onClick={() => handleFilterChange('movies')}
              >
                Film
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${filter === 'new' ? 'active' : ''}`}
                href="/home"
                onClick={() => handleFilterChange('new')}
              >
                Nuovi e Popolari
              </a>
            </li>
          </ul>

          {/* Icone a destra */}
          <div className="d-flex align-items-center">
            {/* Cerca */}
            <div className="search-container d-flex">
              <button className="btn btn-outline-light" onClick={searchMovies}>
                <i className="bi bi-search"></i>
              </button>
              <input
                type="text"
                className="form-control mx-2"
                placeholder="Cerca film o serie TV"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && searchMovies()}
              />
            </div>

            {/* Profilo utente */}
            <div className="dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={avatar}
                  alt="avatar"
                  style={{ height: '30px' }}
                />
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="/sidebar/profilo">Profilo</a></li>
                <li><a className="dropdown-item" href="/sidebar">Account</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" onClick={logout}>Esci</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
