import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div>
      <h1>BellaAgenda</h1>
      <p>Agende serviços de beleza online, escolha profissional e pague com segurança.</p>
      <p>
        <Link className="btn" to="/cadastro">Começar</Link>{' '}
        <Link className="btn btn-secondary" to="/login">Entrar</Link>
      </p>
    </div>
  );
}
