import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import InitiateContract from './pages/InitiateContract';
import SettlementDashboard from './pages/SettlementDashboard';
import Dashboard from './pages/Dashboard';
import TransactionHistory from './pages/TransactionHistory';
import UserProfile from './pages/UserProfile';
import Registration from './pages/Registration';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="register" element={<Registration />} />
          <Route path="contract" element={<InitiateContract />} />
          <Route path="settlement" element={<SettlementDashboard />} />
          <Route path="history" element={<TransactionHistory />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
