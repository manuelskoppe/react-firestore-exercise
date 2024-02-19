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
        <div className="App min-h-screen flex flex-col" style={{ 
          backgroundImage: "url('/react-logo-removebg-preview.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left 10px top 80px', // Aumenta el espacio desde la parte superior
          backgroundSize: '200px', // Aumenta el tamaño de la imagen
          backgroundAttachment: 'scroll'
        }}>

          <nav className="bg-blue-500 text-white p-4 w-full flex justify-between fixed top-0 left-0 z-10">
            <Link to="/" className="hover:underline px-4">Inicio</Link> | 
            <Link to="/songs" className="hover:underline px-4">Ver Posts</Link> | 
            <Link to="/registro" className="hover:underline px-4">Registrarse</Link> | 
            <Link to="/login" className="hover:underline px-4">Iniciar Sesión</Link> |
            <Link to="/perfil" className="hover:underline px-4">Perfil</Link>
          </nav>

          <div className="flex-grow w-full" style={{ paddingTop: '5rem', paddingLeft: '550px' }}>
            <Routes>
              <Route path="/" element={
                <div className="text-center w-full">
                  <h1 className="text-4xl font-bold text-black" style={{ paddingLeft: '150px' }}>
                Bienvenido al Foro
              </h1>
                </div>
              } />
              {/* Otras rutas... */}
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
