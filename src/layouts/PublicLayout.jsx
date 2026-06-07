import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export function PublicLayout() {
  const { profile, logout, homeForRole } = useAuth();

  return (
    <div className="layout-public">
      <header>
        <Link to="/"><strong>BellaAgenda</strong></Link>
        <nav>
          {profile ? (
            <>
              <Link to={homeForRole(profile.role)}>Minha área</Link>
              <button type="button" className="btn btn-secondary" onClick={logout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Entrar</Link>
              <Link to="/cadastro">Cadastrar</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
