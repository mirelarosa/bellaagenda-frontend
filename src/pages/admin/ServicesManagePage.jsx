import { useEffect, useState } from 'react';
import { listServices, createService, deleteService } from '../../api/services';

export function ServicesManagePage() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [priceCents, setPriceCents] = useState(5000);

  const load = () => listServices().then(setServices);

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await createService({ name, durationMinutes, priceCents, description: '' });
    setName('');
    load();
  };

  const handleDelete = async (id) => {
    await deleteService(id);
    load();
  };

  return (
    <div>
      <h1>Gerenciar serviços</h1>
      <form onSubmit={handleCreate} className="card">
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duração (min)</label>
          <input
            id="duration"
            type="number"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço (centavos)</label>
          <input
            id="price"
            type="number"
            value={priceCents}
            onChange={(e) => setPriceCents(Number(e.target.value))}
          />
        </div>
        <button type="submit" className="btn">Adicionar</button>
      </form>
      <div className="grid-services">
        {services.map((s) => (
          <div key={s.id} className="card">
            <h3>{s.name}</h3>
            <p>
              {s.durationMinutes} min — R$ {(s.priceCents / 100).toFixed(2)}
            </p>
            <button type="button" className="btn btn-secondary" onClick={() => handleDelete(s.id)}>
              Desativar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
