import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listServices } from '../../api/services';

export function ServicesPage() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    listServices()
      .then(setServices)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div>
      <h1>Serviços</h1>
      {error && <p className="error">{error}</p>}
      <div className="grid-services">
        {services.map((s) => (
          <div key={s.id} className="card">
            <h3>{s.name}</h3>
            <p>{s.description}</p>
            <p>
              {s.durationMinutes} min — R$ {(s.priceCents / 100).toFixed(2)}
            </p>
            <Link className="btn" to="/cliente/agendar" state={{ serviceId: s.id }}>
              Agendar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
