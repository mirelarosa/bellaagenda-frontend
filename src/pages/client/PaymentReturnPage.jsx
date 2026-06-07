import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getAppointment } from '../../api/appointments';
import { useAuth } from '../../auth/useAuth';

export function PaymentReturnPage({ success }) {
  const { profile, loading } = useAuth();
  const [params] = useSearchParams();
  const appointmentId = params.get('appointmentId');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (appointmentId && success && profile) {
      getAppointment(appointmentId)
        .then((a) => setStatus(a.status))
        .catch(() => setStatus(''));
    }
  }, [appointmentId, success, profile]);

  return (
    <div className="card">
      <h1>{success ? 'Pagamento recebido' : 'Pagamento cancelado'}</h1>
      {loading && <p>Carregando sessão...</p>}
      {!loading && !profile && (
        <p>
          Você foi redirecionado após o pagamento sem sessão ativa.{' '}
          <Link to="/login" state={{ from: { pathname: '/cliente/agendamentos' } }}>
            Entrar novamente
          </Link>{' '}
          para ver seus agendamentos.
        </p>
      )}
      {success && status && <p>Status do agendamento: {status}</p>}
      {profile && (
        <Link className="btn" to="/cliente/agendamentos">
          Ver meus agendamentos
        </Link>
      )}
    </div>
  );
}
