import { useEffect, useState } from 'react';
import { listProfessionals, createProfessional } from '../../api/professionals';

export function ProfessionalsPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [firebaseUid, setFirebaseUid] = useState('');

  const load = () => listProfessionals().then(setItems);

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await createProfessional({
      name,
      email,
      firebaseUid: firebaseUid || `uid-${Date.now()}`
    });
    setName('');
    setEmail('');
    setFirebaseUid('');
    load();
  };

  return (
    <div>
      <h1>Profissionais</h1>
      <form onSubmit={handleCreate} className="card">
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="uid">Firebase UID (opcional)</label>
          <input id="uid" value={firebaseUid} onChange={(e) => setFirebaseUid(e.target.value)} />
        </div>
        <button type="submit" className="btn">Cadastrar</button>
      </form>
      {items.map((p) => (
        <div key={p.id} className="card">
          <h3>{p.name}</h3>
          <p>{p.email}</p>
        </div>
      ))}
    </div>
  );
}
