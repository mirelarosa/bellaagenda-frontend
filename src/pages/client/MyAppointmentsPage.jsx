import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listAppointments, cancelAppointment } from '../../api/appointments';

export function MyAppointmentsPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const load = () => {
    listAppointments()
      .then(setItems)
      .catch((e) => setError(e.message));
  };

  useEffect(() => {
    load();
  }, []);

  const handleCancel = async (id) => {
    await cancelAppointment(id);
    load();
  };

  return (
    <div>
      <h1>Meus agendamentos</h1>
      {error && <p className="error">{error}</p>}
      {items.map((a) => (
        <div key={a.id} className="card">
          <h3>{a.serviceName}</h3>
          <p>Profissional: {a.professionalName}</p>
          <p>
            {new Date(a.startsAt).toLocaleString('pt-BR')} — {a.status}
          </p>
          {a.status === 'pending_payment' && (
            <p>Pagamento pendente. Conclua o checkout para confirmar.</p>
          )}
          {['pending_payment', 'confirmed'].includes(a.status) && (
            <button type="button" className="btn btn-secondary" onClick={() => handleCancel(a.id)}>
              Cancelar
            </button>
          )}
          {a.status === 'completed' && (
            <Link to={`/cliente/agendamentos/${a.id}/avaliar`}>Avaliar</Link>
          )}
        </div>
      ))}
    </div>
  );
}
