import React, { useState } from 'react';
import { createPayment } from '../services/api';

function PaymentForm({ onPaymentCreated }) {
  const [customer, setCustomer] = useState(''); // Customer ID
  const [billingType, setBillingType] = useState('BOLETO');
  const [value, setValue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!customer || !billingType || !value || !dueDate) {
      setError('Customer ID, Tipo de Cobrança, Valor e Data de Vencimento são obrigatórios.');
      return;
    }

    try {
      const paymentData = {
        customer,
        billingType,
        value: parseFloat(value),
        dueDate,
        description: description || `Cobrança para ${customer}`,
      };
      const response = await createPayment(paymentData);
      setMessage(`Cobrança criada com ID: ${response.data.data.id}, Status: ${response.data.data.status}`);
      setCustomer('');
      // setBillingType('BOLETO'); // Keep or reset as preferred
      setValue('');
      setDueDate('');
      setDescription('');
      if (onPaymentCreated) {
        onPaymentCreated();
      }
    } catch (err) {
      setError(`Erro ao criar cobrança: ${err.response?.data?.detalhes || err.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Criar Nova Cobrança</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID do Cliente:</label>
          <input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)} required />
          {/* Improvement suggestion: Fetch customers and use a dropdown here */}
        </div>
        <div>
          <label>Tipo de Cobrança:</label>
          <select value={billingType} onChange={(e) => setBillingType(e.target.value)} required>
            <option value="BOLETO">Boleto</option>
            <option value="CREDIT_CARD">Cartão de Crédito</option>
            <option value="PIX">PIX</option>
            <option value="UNDEFINED">Indefinido (Asaas decide)</option>
          </select>
        </div>
        <div>
          <label>Valor (ex: 100.50):</label>
          <input type="number" step="0.01" value={value} onChange={(e) => setValue(e.target.value)} required />
        </div>
        <div>
          <label>Data de Vencimento:</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>
        <div>
          <label>Descrição (opcional):</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Criar Cobrança</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default PaymentForm;