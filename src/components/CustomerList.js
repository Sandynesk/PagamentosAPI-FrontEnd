import React, { useState, useEffect } from 'react';
import { getCustomers } from '../services/api';

function CustomerList({ refreshKey }) {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getCustomers();
      setCustomers(response.data.data.data || []); // Asaas API nests data
    } catch (err) {
      setError(`Erro ao buscar clientes: ${err.response?.data?.detalhes || err.message}`);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [refreshKey]); // Refreshes when refreshKey changes

  return (
    <div className="list-container">
      <h2>Lista de Clientes</h2>
      <button onClick={fetchCustomers} disabled={loading}>
        {loading ? 'Carregando...' : 'Atualizar Lista de Clientes'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {customers.length === 0 && !loading && !error && <p>Nenhum cliente encontrado.</p>}
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <strong>ID:</strong> {customer.id} <br />
            <strong>Nome:</strong> {customer.name} <br />
            <strong>Email:</strong> {customer.email} <br />
            <strong>CPF/CNPJ:</strong> {customer.cpfCnpj}
            {customer.phone && <> <br /><strong>Telefone:</strong> {customer.phone}</>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerList;