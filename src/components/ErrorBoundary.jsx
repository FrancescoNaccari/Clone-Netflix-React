// src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Aggiorna lo stato per mostrare l'interfaccia di fallback
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Puoi loggare l'errore a un servizio di reporting
    console.error('ErrorBoundary ha catturato un errore:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Interfaccia di fallback personalizzata
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Qualcosa è andato storto.</h1>
          <p>{this.state.error?.message || 'Si è verificato un errore inaspettato.'}</p>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
