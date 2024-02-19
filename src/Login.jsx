import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { app } from "./firebase";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false); // Estado para manejar el mensaje de éxito
  const auth = getAuth(app);
  const navigate = useNavigate(); // Hook para la redirección

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoginSuccess(false); // Reinicia el estado de éxito en cada intento de login
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      setLoginSuccess(true); // Establece el éxito del login
      // Redirige al usuario después de un breve retraso para permitir que se muestre el mensaje de éxito
      setTimeout(() => navigate('/'), 2000); // Asume que la ruta de tu página principal es '/'
    } catch (error) {
      setLoginSuccess(false); // Asegura que el estado de éxito sea falso si el login falla
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No se encontró cuenta con ese email. Por favor, regístrate.');
          break;
        case 'auth/wrong-password':
          setError('Contraseña incorrecta. Por favor, intenta de nuevo.');
          break;
        default:
          setError('Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo.');
          break;
      }
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white shadow-md rounded">
      <h1 className="text-xl font-bold text-center mb-4">Iniciar Sesión</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                 className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm"/>
        </div>
        <div>
          <label className="block text-gray-700">Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
                 className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm"/>
        </div>
        <button type="submit" 
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
