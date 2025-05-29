import React, { useState, useEffect } from 'react';
import { getPayments } from '../services/api';

function PaymentList({ refreshKey }) {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getPayments();
      setPayments(response.data.data.data || []); // Asaas API nests data
    } catch (err) {
      setError(`Erro ao buscar cobranças: ${err.response?.data?.detalhes || err.message}`);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [refreshKey]);

  return (
    <div className="list-container">
      <h2>Lista de Cobranças</h2>
      <button onClick={fetchPayments} disabled={loading}>
        {loading ? 'Carregando...' : 'Atualizar Lista de Cobranças'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {payments.length === 0 && !loading && !error && <p>Nenhuma cobrança encontrada.</p>}
      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>
            <strong>ID da Cobrança:</strong> {payment.id} <br />
            <strong>ID do Cliente:</strong> {payment.customer} <br />
            <strong>Valor:</strong> R$ {parseFloat(payment.value).toFixed(2)} <br />
            <strong>Vencimento:</strong> {new Date(payment.dueDate).toLocaleDateString()} <br />
            <strong>Status:</strong> {payment.status} <br />
            <strong>Tipo:</strong> {payment.billingType} <br />
            {payment.invoiceUrl && <><strong>Link:</strong> <a href={payment.invoiceUrl} target="_blank" rel="noopener noreferrer">Ver Fatura</a><br /></>}
            {payment.bankSlipUrl && <><strong>Boleto:</strong> <a href={payment.bankSlipUrl} target="_blank" rel="noopener noreferrer">Ver Boleto</a><br /></>}
             {payment.pixQrCode && <><strong>PIX QR Code:</strong> <img src={payment.pixQrCode} alt="PIX QR Code" style={{width: "100px", height: "100px"}} /><br /></>}

          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentList;