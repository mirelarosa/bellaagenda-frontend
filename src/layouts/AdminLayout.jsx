import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export function AdminLayout() {
  const { profile, logout } = useAuth();

  return (
    <div className="layout-admin">
      <aside>
        <h2>BellaAgenda Admin</h2>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/servicos">Serviços</NavLink>
        <NavLink to="/admin/profissionais">Profissionais</NavLink>
        <NavLink to="/admin/relatorios">Relatórios</NavLink>
        <hr style={{ borderColor: '#3d3d5c', margin: '1.5rem 0' }} />
        <Link to="/">Site público</Link>
        <p style={{ fontSize: '0.85rem', marginTop: '1rem' }}>{profile?.name}</p>
        <button type="button" className="btn btn-secondary" onClick={logout}>
          Sair
        </button>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
