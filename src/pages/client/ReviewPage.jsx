import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createReview } from '../../api/reviews';

export function ReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview({ appointmentId: id, rating: Number(rating), comment });
      navigate('/cliente/agendamentos');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h1>Avaliar atendimento</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="rating">Nota (1-5)</label>
          <input
            id="rating"
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comentário</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn">Enviar avaliação</button>
      </form>
    </div>
  );
}
