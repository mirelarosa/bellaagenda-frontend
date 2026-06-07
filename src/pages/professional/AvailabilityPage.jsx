import { useEffect, useState } from 'react';
import { getSchedule, listProfessionals, updateSchedule } from '../../api/professionals';
import { useAuth } from '../../auth/useAuth';
import {
  WEEKDAYS,
  createEmptyWeekSchedule,
  mergeScheduleWithDefaults,
  weekScheduleToSlots
} from '../../utils/schedule';

export function AvailabilityPage() {
  const { profile } = useAuth();
  const [professionalId, setProfessionalId] = useState('');
  const [weekSchedule, setWeekSchedule] = useState(createEmptyWeekSchedule);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    listProfessionals().then((list) => {
      const mine = list.find((p) => p.email === profile?.email);
      if (mine) setProfessionalId(mine.id);
    });
  }, [profile]);

  useEffect(() => {
    if (!professionalId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    getSchedule(professionalId)
      .then((slots) => setWeekSchedule(mergeScheduleWithDefaults(slots)))
      .catch((e) => {
        setWeekSchedule(createEmptyWeekSchedule());
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, [professionalId]);

  const updateDay = (weekday, patch) => {
    setWeekSchedule((prev) =>
      prev.map((day) => (day.weekday === weekday ? { ...day, ...patch } : day))
    );
    setMessage('');
    setError('');
  };

  const handleSave = async () => {
    if (!professionalId) return;
    const enabledDays = weekSchedule.filter((day) => day.enabled);
    if (enabledDays.length === 0) {
      setError('Selecione pelo menos um dia de atendimento.');
      return;
    }
    for (const day of enabledDays) {
      if (day.startTime >= day.endTime) {
        setError('O horário de início deve ser anterior ao horário de término.');
        return;
      }
    }
    setSaving(true);
    setMessage('');
    setError('');
    try {
      await updateSchedule(professionalId, weekScheduleToSlots(weekSchedule));
      setMessage('Horários de atendimento salvos com sucesso.');
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1>Disponibilidade</h1>
      <div className="card">
        <p>Defina os dias e horários em que você atende. Os clientes só poderão agendar nesses períodos.</p>
        {loading ? (
          <p>Carregando horários...</p>
        ) : (
          <div className="schedule-grid">
            {weekSchedule.map((day) => {
              const label = WEEKDAYS.find((d) => d.value === day.weekday)?.label;
              return (
                <div key={day.weekday} className="schedule-row">
                  <label className="schedule-day-toggle">
                    <input
                      type="checkbox"
                      checked={day.enabled}
                      onChange={(e) => updateDay(day.weekday, { enabled: e.target.checked })}
                    />
                    <span>{label}</span>
                  </label>
                  <div className="schedule-times">
                    <input
                      type="time"
                      value={day.startTime}
                      disabled={!day.enabled}
                      onChange={(e) => updateDay(day.weekday, { startTime: e.target.value })}
                    />
                    <span>até</span>
                    <input
                      type="time"
                      value={day.endTime}
                      disabled={!day.enabled}
                      onChange={(e) => updateDay(day.weekday, { endTime: e.target.value })}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {error && <p className="error">{error}</p>}
        {message && <p>{message}</p>}
        <button
          type="button"
          className="btn"
          onClick={handleSave}
          disabled={!professionalId || loading || saving}
        >
          {saving ? 'Salvando...' : 'Salvar horários'}
        </button>
      </div>
    </div>
  );
}
