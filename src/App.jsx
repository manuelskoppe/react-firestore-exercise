import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext.jsx'; // Importa useAuth aquí
import ProtectedRoute from './ProtectedRoute';
import SongForm from './SongForm';
import SongList from './SongList';
import SongDetail from './SongDetail';
import Register from './Register';
import Login from './Login';
import UserProfile from './UserProfile';
import TopLikedSongs from './TopLikedSongs';


// Asegúrate de definir HomePage dentro de App o importarlo si está en otro archivo
function HomePage() {
  const { currentUser } = useAuth(); // Correctamente usa useAuth para acceder al usuario actual

  return (
    <div className="text-center w-full">
      <h1 className="text-4xl font-bold text-black">
        Bienvenido al Foro {currentUser ? `: ${currentUser.email}` : ''}
      </h1>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen flex flex-col" style={{ 
          backgroundImage: "url('/react-logo-removebg-preview.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left 10px top 80px',
          backgroundSize: '200px',
          backgroundAttachment: 'scroll'
        }}>
          <nav className="bg-blue-500 text-white p-4 w-full flex justify-between fixed top-0 left-0 z-10">
            <Link to="/" className="hover:underline px-4">Inicio</Link> | 
            <Link to="/songs" className="hover:underline px-4">Ver Posts</Link> | 
            <Link to="/registro" className="hover:underline px-4">Registrarse</Link> | 
            <Link to="/login" className="hover:underline px-4">Iniciar Sesión</Link> |
            <Link to="/perfil" className="hover:underline px-4">Perfil</Link>
            <Link to="/top-liked" className="hover:underline px-4">Top Likes</Link>
          </nav>

          <div className="flex-grow w-full" style={{ paddingTop: '5rem', paddingLeft: '550px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} /> {/* Usa el componente HomePage aquí */}
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/songs" element={<ProtectedRoute><SongList /></ProtectedRoute>} />
              <Route path="/songs/:songId" element={<ProtectedRoute><SongDetail /></ProtectedRoute>} />
              <Route path="/nuevo-post" element={<ProtectedRoute><SongForm /></ProtectedRoute>} />
              <Route path="/perfil" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
              <Route path="/top-liked" element={<ProtectedRoute><TopLikedSongs /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
