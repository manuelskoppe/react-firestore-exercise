import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from "./firebase";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth(app);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      // Aquí puedes redirigir al usuario
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Este correo electrónico ya está en uso. Por favor, intenta con otro.');
          break;
        case 'auth/weak-password':
          setError('La contraseña es demasiado débil. Debe tener al menos 6 caracteres.');
          break;
        default:
          setError('Ocurrió un error al registrar la cuenta. Por favor, intenta de nuevo.');
          break;
      }
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white shadow-md rounded">
      <h1 className="text-xl font-bold text-center mb-4">Registro</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
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
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
