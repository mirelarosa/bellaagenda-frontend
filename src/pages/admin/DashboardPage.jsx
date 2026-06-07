import { useEffect, useState } from 'react';
import { getSummary } from '../../api/reports';

export function DashboardPage() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getSummary().then(setSummary);
  }, []);

  if (!summary) return <p>Carregando...</p>;

  const revenue = (summary.revenue?.total_revenue_cents || 0) / 100;

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="stat-grid">
        <div className="stat-card">
          <span>Receita</span>
          <strong>R$ {revenue.toFixed(2)}</strong>
        </div>
        <div className="stat-card">
          <span>Pagamentos</span>
          <strong>{summary.revenue?.paid_count || 0}</strong>
        </div>
        <div className="stat-card">
          <span>Avaliação média</span>
          <strong>{Number(summary.reviews?.average_rating || 0).toFixed(1)}</strong>
        </div>
        <div className="stat-card">
          <span>Avaliações</span>
          <strong>{summary.reviews?.review_count || 0}</strong>
        </div>
      </div>
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3>Agendamentos por status</h3>
        <ul>
          {(summary.appointmentsByStatus || []).map((row) => (
            <li key={row.status}>
              {row.status}: {row.count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
