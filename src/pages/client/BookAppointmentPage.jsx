import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { listServices } from '../../api/services';
import { listProfessionals } from '../../api/professionals';
import { getAvailability, createAppointment } from '../../api/appointments';
import { createCheckout } from '../../api/payments';

export function BookAppointmentPage() {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [slots, setSlots] = useState([]);
  const [serviceId, setServiceId] = useState(location.state?.serviceId || '');
  const [professionalId, setProfessionalId] = useState('');
  const [date, setDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const filtersReady = Boolean(professionalId && serviceId && date);

  useEffect(() => {
    listServices().then(setServices);
    listProfessionals().then(setProfessionals).catch(() => setProfessionals([]));
  }, []);

  useEffect(() => {
    setSelectedSlot('');
    if (!filtersReady) {
      setSlots([]);
      setSlotsLoading(false);
      return;
    }
    setSlotsLoading(true);
    setError('');
    getAvailability({ professionalId, serviceId, date })
      .then(setSlots)
      .catch((e) => {
        setSlots([]);
        setError(e.message);
      })
      .finally(() => setSlotsLoading(false));
  }, [professionalId, serviceId, date, filtersReady]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      setError('Selecione um horário disponível.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const appointment = await createAppointment({
        professionalId,
        serviceId,
        startsAt: selectedSlot
      });
      const checkout = await createCheckout(appointment.id);
      window.location.href = checkout.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Agendar</h1>
      <form onSubmit={handleBook} className="card">
        <div className="form-group">
          <label htmlFor="service">Serviço</label>
          <select
            id="service"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="professional">Profissional</label>
          <select
            id="professional"
            value={professionalId}
            onChange={(e) => setProfessionalId(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            {professionals.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Data</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        {filtersReady && (
          <div className="form-group">
            <label htmlFor="slot">Horário</label>
            {slotsLoading ? (
              <p>Carregando horários...</p>
            ) : slots.length > 0 ? (
              <select
                id="slot"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                {slots.map((s) => (
                  <option key={s.startsAt} value={s.startsAt}>
                    {new Date(s.startsAt).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </option>
                ))}
              </select>
            ) : (
              <p className="error">
                Nenhum horário disponível nesta data. Escolha outra data, outro profissional ou
                peça ao profissional para configurar a agenda em Disponibilidade.
              </p>
            )}
          </div>
        )}
        {error && <p className="error">{error}</p>}
        <button
          type="submit"
          className="btn"
          disabled={loading || slotsLoading || !selectedSlot}
        >
          {loading ? 'Processando...' : 'Ir para pagamento'}
        </button>
      </form>
    </div>
  );
}
