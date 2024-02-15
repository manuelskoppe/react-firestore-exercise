import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './AuthContext.jsx';
import ProtectedRoute from './ProtectedRoute';
import SongForm from './SongForm';
import SongList from './SongList';
import SongDetail from './SongDetail';
import Register from './Register';
import Login from './Login';
import UserProfile from './UserProfile'; // Asegúrate de importar UserProfile aquí

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen flex flex-col bg-[url('/path/to/your/background.jpg')] bg-cover bg-center">
          <nav className="bg-blue-500 text-white p-4 w-full flex justify-between fixed top-0 left-0 z-10">
            <Link to="/" className="hover:underline px-4">Inicio</Link> | 
            <Link to="/songs" className="hover:underline px-4">Ver Posts</Link> | 
            <Link to="/registro" className="hover:underline px-4">Registrarse</Link> | 
            <Link to="/login" className="hover:underline px-4">Iniciar Sesión</Link> |
            <Link to="/perfil" className="hover:underline px-4">Perfil</Link>
          </nav>
          {/* Contenedor para el contenido central con centrado y espacio para la barra de navegación */}
          <div className="flex-grow flex flex-col items-center justify-center pt-20">
            <Routes>
              {/* Usa text-white en lugar de text-black para asegurar la legibilidad sobre fondos oscuros */}
              <Route path="/" element={<h1 className="text-4xl font-bold text-black" style={{ paddingLeft: '700px' }}>Bienvenido a la Aplicación</h1>} />

              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/songs" element={<ProtectedRoute><SongList /></ProtectedRoute>} />
              <Route path="/songs/:songId" element={<ProtectedRoute><SongDetail /></ProtectedRoute>} />
              <Route path="/nuevo-post" element={<ProtectedRoute><SongForm /></ProtectedRoute>} />
              <Route path="/perfil" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
