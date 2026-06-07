import { useEffect, useState } from 'react';
import { listAppointments } from '../../api/appointments';

export function SchedulePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    listAppointments().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h1>Minha agenda</h1>
      {items.length === 0 ? (
        <p>Nenhum agendamento.</p>
      ) : (
        items.map((a) => (
          <div key={a.id} className="card">
            <h3>{a.serviceName}</h3>
            <p>Cliente: {a.clientName}</p>
            <p>{new Date(a.startsAt).toLocaleString('pt-BR')}</p>
            <p>Status: {a.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
