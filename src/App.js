// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
import SearchResults from './components/home/SearchResults';
import Account from './components/account/Account';
import Sidebar from './components/account/Sidebar';
import Profilo from './components/account/Profilo';
import ModificaPiano from './components/account/ModificaPiano';
import Abbonamento from './components/account/Abbonamento';
import UtenteExtra from './components/account/UtenteExtra';
import AggiornaPassword from './components/account/AggiornaPassword';
import GestisciDispositivi from './components/account/GestisciDispositivi';
import GestisciPagamento from './components/account/GestisciPagamento';
import Impostazioni from './components/account/Impostazioni';
import Sicurezza from './components/account/Sicurezza';
import Navbar from './components/navbar/Navbar';
import { FilterProvider } from './context/FilterContext';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <Router>
    <FilterProvider>
      <Navbar />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />

        {/* Routes with Sidebar */}
        <Route path="/sidebar/*" element={<Sidebar />}>
          <Route path="account" element={<Account />} />
          <Route path="sicurezza" element={<Sicurezza />} />
          <Route path="abbonamento" element={<Abbonamento />} />
          <Route path="profilo" element={<Profilo />} />
          <Route path="modificaPiano" element={<ModificaPiano />} />
          <Route path="utenteExtra" element={<UtenteExtra />} />
          <Route path="aggiornaPassword" element={<AggiornaPassword />} />
          <Route path="gestisciDispositivi" element={<GestisciDispositivi />} />
          <Route path="gestisciPagamenti" element={<GestisciPagamento />} />
          <Route path="impostazioni" element={<Impostazioni />} />
          {/* Default child route */}
          <Route index element={<Navigate to="account" />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </FilterProvider>
  </Router>
  );
};

export default App;
