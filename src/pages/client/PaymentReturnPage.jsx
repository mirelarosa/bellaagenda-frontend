import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getAppointment } from '../../api/appointments';
import { syncPayment } from '../../api/payments';
import { useAuth } from '../../auth/useAuth';

export function PaymentReturnPage({ success }) {
  const { profile, loading } = useAuth();
  const [params] = useSearchParams();
  const appointmentId = params.get('appointmentId');
  const sessionId = params.get('session_id');
  const [status, setStatus] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!appointmentId || !success || !profile) return;

    const loadStatus = async () => {
      setSyncing(true);
      setError('');
      try {
        if (sessionId) {
          const result = await syncPayment(sessionId);
          setStatus(result.status);
          return;
        }
        const appointment = await getAppointment(appointmentId);
        setStatus(appointment.status);
      } catch (e) {
        setError(e.message);
        try {
          const appointment = await getAppointment(appointmentId);
          setStatus(appointment.status);
        } catch {
          setStatus('');
        }
      } finally {
        setSyncing(false);
      }
    };

    loadStatus();
  }, [appointmentId, sessionId, success, profile]);

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
      {syncing && <p>Confirmando pagamento...</p>}
      {success && status && <p>Status do agendamento: {status}</p>}
      {error && <p className="error">{error}</p>}
      {profile && (
        <Link className="btn" to="/cliente/agendamentos">
          Ver meus agendamentos
        </Link>
      )}
    </div>
  );
}
