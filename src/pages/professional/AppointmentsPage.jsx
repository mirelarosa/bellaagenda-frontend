import { useEffect, useState } from 'react';
import { listAppointments, confirmAppointment } from '../../api/appointments';

export function AppointmentsPage() {
  const [items, setItems] = useState([]);

  const load = () => listAppointments().then(setItems);

  useEffect(() => {
    load();
  }, []);

  const handleConfirm = async (id) => {
    await confirmAppointment(id);
    load();
  };

  const pending = items.filter((a) =>
    ['pending_payment', 'confirmed'].includes(a.status)
  );

  return (
    <div>
      <h1>Atendimentos</h1>
      {pending.map((a) => (
        <div key={a.id} className="card">
          <h3>{a.serviceName}</h3>
          <p>{new Date(a.startsAt).toLocaleString('pt-BR')} — {a.status}</p>
          {a.status !== 'cancelled' && (
            <button type="button" className="btn" onClick={() => handleConfirm(a.id)}>
              Confirmar
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
