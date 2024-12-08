// src/components/navbar/Navbar.js
import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { useFilter } from '../../context/FilterContext';  
import AuthService from '../../services/authService';
import MoviesService from '../../services/moviesService';
import './Navbar.css';
import logo from '../../assets/logo_netflix.png';
import avatar from '../../assets/userAvatar.png';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { filter, setFilter } = useFilter(); 
  const navigate = useNavigate();

  const logout = () => {
    AuthService.logout();
    navigate('/');
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter); 
    navigate('/home'); 
  };

  const searchMovies = () => {
    if (searchQuery.trim()) {
      MoviesService.searchMovies(searchQuery)
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top p-0">
      <div className="container-fluid">
        {/* Logo */}
        <div className="navbar-brand" style={{cursor:'pointer'}} onClick={() => navigate('/home')}>
          <img src={logo} alt="Netflix" style={{ height: '25px' }} />
        </div>

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
              <div
                className={`nav-link ${filter === 'all' ? 'active' : ''}`}
                onClick={() => handleFilterChange('all')}
              >
                Home
              </div>
            </li>
            <li className="nav-item">
              <div
                className={`nav-link ${filter === 'tvshows' ? 'active' : ''}`}
                onClick={() => handleFilterChange('tvshows')}
              >
                Serie TV
              </div>
            </li>
            <li className="nav-item">
              <div
                className={`nav-link ${filter === 'movies' ? 'active' : ''}`}
                onClick={() => handleFilterChange('movies')}
              >
                Film
              </div>
            </li>
            <li className="nav-item">
              <div
                className={`nav-link ${filter === 'new' ? 'active' : ''}`}
                onClick={() => handleFilterChange('new')}
              >
                Nuovi e Popolari
              </div>
            </li>
          </ul>

          {/* Icone a destra */}
          <div className="d-flex align-items-center">
            {/* Cerca */}
            <div className="search-container d-flex">
              <button className="btn btn-outline-light p-0 px-2" onClick={searchMovies}>
                <i className="bi bi-search"></i>
              </button>
              <input
                type="text"
                className="form-control mx-2 p-1"
                placeholder="Cerca film o serie TV"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && searchMovies()}
              />
            </div>

            {/* Profilo utente */}
            <div className="dropdown">
              <div
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{cursor:'pointer'}}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  style={{ height: '25px' }}
                />
              </div>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                {/* Link alla pagina Profilo: usiamo <Link> */}
                <li><Link className="dropdown-item" to="/sidebar/profilo">Profilo</Link></li>
                <li><Link className="dropdown-item" to="/sidebar/account">Account</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={logout}>Esci</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
