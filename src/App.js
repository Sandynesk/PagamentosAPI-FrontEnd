import React, { useState } from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import PaymentForm from './components/PaymentForm';
import PaymentList from './components/PaymentList';
import './App.css'; // For basic styling

function App() {
  const [customerRefreshKey, setCustomerRefreshKey] = useState(0);
  const [paymentRefreshKey, setPaymentRefreshKey] = useState(0);

  const handleCustomerCreated = () => {
    setCustomerRefreshKey(prevKey => prevKey + 1);
  };

  const handlePaymentCreated = () => {
    setPaymentRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard de Pagamentos Asaas</h1>
      </header>
      <main className="App-main">
        <section className="App-section">
          <CustomerForm onCustomerCreated={handleCustomerCreated} />
          <CustomerList refreshKey={customerRefreshKey} />
        </section>
        <hr className="section-divider" />
        <section className="App-section">
          <PaymentForm onPaymentCreated={handlePaymentCreated} />
          <PaymentList refreshKey={paymentRefreshKey} />
        </section>
      </main>
    </div>
  );
}

export default App;