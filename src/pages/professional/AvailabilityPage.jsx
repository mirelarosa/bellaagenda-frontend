import { useEffect, useState } from 'react';
import { listProfessionals, updateSchedule } from '../../api/professionals';
import { useAuth } from '../../auth/useAuth';

const DEFAULT_SLOTS = [
  { weekday: 1, startTime: '09:00', endTime: '18:00' },
  { weekday: 2, startTime: '09:00', endTime: '18:00' },
  { weekday: 3, startTime: '09:00', endTime: '18:00' },
  { weekday: 4, startTime: '09:00', endTime: '18:00' },
  { weekday: 5, startTime: '09:00', endTime: '18:00' }
];

export function AvailabilityPage() {
  const { profile } = useAuth();
  const [professionalId, setProfessionalId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    listProfessionals().then((list) => {
      const mine = list.find((p) => p.email === profile?.email);
      if (mine) setProfessionalId(mine.id);
    });
  }, [profile]);

  const handleSave = async () => {
    if (!professionalId) return;
    await updateSchedule(professionalId, DEFAULT_SLOTS);
    setMessage('Horários atualizados (seg–sex 09h–18h).');
  };

  return (
    <div>
      <h1>Disponibilidade</h1>
      <div className="card">
        <p>Configure a janela padrão de atendimento (dias úteis).</p>
        <button type="button" className="btn" onClick={handleSave} disabled={!professionalId}>
          Salvar horários padrão
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
