import React, { useState } from 'react';
import { createCustomer } from '../services/api';

function CustomerForm({ onCustomerCreated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!name || !email || !cpfCnpj) {
      setError('Nome, Email, e CPF/CNPJ são obrigatórios.');
      return;
    }

    try {
      const response = await createCustomer({ name, email, cpfCnpj, phone });
      setMessage(`Cliente "${response.data.data.name}" criado com ID: ${response.data.data.id}`);
      setName('');
      setEmail('');
      setCpfCnpj('');
      setPhone('');
      if (onCustomerCreated) {
        onCustomerCreated(); // Callback to refresh customer list
      }
    } catch (err) {
      setError(`Erro ao criar cliente: ${err.response?.data?.detalhes || err.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Criar Novo Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>CPF/CNPJ:</label>
          <input type="text" value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} required />
        </div>
        <div>
          <label>Telefone (opcional):</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button type="submit">Criar Cliente</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default CustomerForm;