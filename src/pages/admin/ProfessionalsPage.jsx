import { useEffect, useState } from 'react';
import { listProfessionals, createProfessional } from '../../api/professionals';

export function ProfessionalsPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const load = () => listProfessionals().then(setItems);

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await createProfessional({ name, email });
      setName('');
      setEmail('');
      setMessage('Profissional cadastrado. Se o e-mail já existia como cliente, o perfil foi atualizado.');
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Profissionais</h1>
      <form onSubmit={handleCreate} className="card">
        <p>
          Cadastre pelo e-mail. Se a pessoa já tiver conta como cliente, o perfil será atualizado para
          profissional sem duplicar o usuário.
        </p>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className="btn">Cadastrar</button>
        {message && <p>{message}</p>}
        {error && <p className="error">{error}</p>}
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
