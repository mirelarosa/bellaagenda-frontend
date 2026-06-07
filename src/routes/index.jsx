import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { HomePage } from '../pages/public/HomePage';
import { LoginPage } from '../pages/public/LoginPage';
import { RegisterPage } from '../pages/public/RegisterPage';
import { ServicesPage } from '../pages/client/ServicesPage';
import { BookAppointmentPage } from '../pages/client/BookAppointmentPage';
import { MyAppointmentsPage } from '../pages/client/MyAppointmentsPage';
import { PaymentReturnPage } from '../pages/client/PaymentReturnPage';
import { ReviewPage } from '../pages/client/ReviewPage';
import { SchedulePage } from '../pages/professional/SchedulePage';
import { AppointmentsPage } from '../pages/professional/AppointmentsPage';
import { AvailabilityPage } from '../pages/professional/AvailabilityPage';
import { DashboardPage } from '../pages/admin/DashboardPage';
import { ServicesManagePage } from '../pages/admin/ServicesManagePage';
import { ProfessionalsPage } from '../pages/admin/ProfessionalsPage';
import { ReportsPage } from '../pages/admin/ReportsPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/pagamento/sucesso" element={<PaymentReturnPage success />} />
        <Route path="/pagamento/cancelado" element={<PaymentReturnPage success={false} />} />
      </Route>

      <Route
        path="/cliente"
        element={
          <ProtectedRoute roles={['client']}>
            <UserLayout area="client" />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="servicos" replace />} />
        <Route path="servicos" element={<ServicesPage />} />
        <Route path="agendar" element={<BookAppointmentPage />} />
        <Route path="agendamentos" element={<MyAppointmentsPage />} />
        <Route path="agendamentos/:id/avaliar" element={<ReviewPage />} />
      </Route>

      <Route
        path="/profissional"
        element={
          <ProtectedRoute roles={['professional']}>
            <UserLayout area="professional" />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="agenda" replace />} />
        <Route path="agenda" element={<SchedulePage />} />
        <Route path="atendimentos" element={<AppointmentsPage />} />
        <Route path="disponibilidade" element={<AvailabilityPage />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="servicos" element={<ServicesManagePage />} />
        <Route path="profissionais" element={<ProfessionalsPage />} />
        <Route path="relatorios" element={<ReportsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
