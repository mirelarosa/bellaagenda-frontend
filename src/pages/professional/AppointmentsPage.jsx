import { useEffect, useState } from 'react';
import { listAppointments, confirmAppointment, completeAppointment } from '../../api/appointments';

function canCompleteAppointment(appointment) {
  return appointment.status === 'confirmed' && new Date() >= new Date(appointment.endsAt);
}

export function AppointmentsPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [actionId, setActionId] = useState('');

  const load = () => listAppointments().then(setItems).catch((e) => setError(e.message));

  useEffect(() => {
    load();
  }, []);

  const handleConfirm = async (id) => {
    setActionId(id);
    setError('');
    try {
      await confirmAppointment(id);
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setActionId('');
    }
  };

  const handleComplete = async (id) => {
    setActionId(id);
    setError('');
    try {
      await completeAppointment(id);
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setActionId('');
    }
  };

  const active = items.filter((a) => ['pending_payment', 'confirmed'].includes(a.status));

  return (
    <div>
      <h1>Atendimentos</h1>
      {error && <p className="error">{error}</p>}
      {active.length === 0 ? (
        <p>Nenhum atendimento pendente.</p>
      ) : (
        active.map((a) => {
          const canComplete = canCompleteAppointment(a);
          const endsAtLabel = new Date(a.endsAt).toLocaleString('pt-BR');
          return (
            <div key={a.id} className="card">
              <h3>{a.serviceName}</h3>
              <p>Cliente: {a.clientName}</p>
              <p>
                {new Date(a.startsAt).toLocaleString('pt-BR')} — {a.status}
              </p>
              {a.status === 'pending_payment' && (
                <button
                  type="button"
                  className="btn"
                  disabled={actionId === a.id}
                  onClick={() => handleConfirm(a.id)}
                >
                  Confirmar pagamento
                </button>
              )}
              {a.status === 'confirmed' && (
                <>
                  <button
                    type="button"
                    className="btn"
                    disabled={!canComplete || actionId === a.id}
                    onClick={() => handleComplete(a.id)}
                  >
                    {actionId === a.id ? 'Concluindo...' : 'Concluir atendimento'}
                  </button>
                  {!canComplete && (
                    <p>Disponível após o término do horário agendado ({endsAtLabel}).</p>
                  )}
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
