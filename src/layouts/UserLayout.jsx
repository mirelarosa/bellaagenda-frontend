import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export function UserLayout({ area }) {
  const { profile, logout } = useAuth();
  const isClient = area === 'client';

  return (
    <div className="layout-user">
      <nav>
        <Link to="/"><strong>BellaAgenda</strong></Link>
        {isClient ? (
          <>
            <NavLink to="/cliente/servicos">Serviços</NavLink>
            <NavLink to="/cliente/agendar">Agendar</NavLink>
            <NavLink to="/cliente/agendamentos">Meus agendamentos</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/profissional/agenda">Agenda</NavLink>
            <NavLink to="/profissional/atendimentos">Atendimentos</NavLink>
            <NavLink to="/profissional/disponibilidade">Disponibilidade</NavLink>
          </>
        )}
        <span style={{ marginLeft: 'auto' }}>{profile?.name}</span>
        <button type="button" className="btn btn-secondary" onClick={logout}>
          Sair
        </button>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
