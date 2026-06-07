import { useEffect, useState } from 'react';
import { getSummary } from '../../api/reports';

export function ReportsPage() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getSummary().then(setSummary);
  }, []);

  if (!summary) return <p>Carregando relatórios...</p>;

  return (
    <div>
      <h1>Relatórios</h1>
      <div className="card">
        <h3>Financeiro</h3>
        <p>
          Receita total: R${' '}
          {((summary.revenue?.total_revenue_cents || 0) / 100).toFixed(2)}
        </p>
        <p>Pagamentos confirmados: {summary.revenue?.paid_count || 0}</p>
      </div>
      <div className="card">
        <h3>Atendimentos</h3>
        <ul>
          {(summary.appointmentsByStatus || []).map((r) => (
            <li key={r.status}>
              {r.status}: {r.count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
