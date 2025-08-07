// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import QuestionarioPage from './pages/QuestionarioPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  // Uma lógica simples para verificar se o usuário está "logado"
  // No futuro, isso virá de um contexto ou estado global.
  const isAuth = true; // Mude para false para testar o redirecionamento

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/questionario" element={isAuth ? <QuestionarioPage /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuth ? <DashboardPage /> : <Navigate to="/login" />} />
        {/* Rota padrão redireciona para o dashboard ou login */}
        <Route path="*" element={<Navigate to={isAuth ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;