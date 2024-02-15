import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from "./firebase"; // Nota el cambio aquí, usando destructuring para importar `app`

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para almacenar el mensaje de error
  const auth = getAuth(app);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      // Redirige al usuario al perfil o a la página de inicio
      // Por ejemplo: navigate('/perfil');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Este correo electrónico ya está en uso. Por favor, intenta con otro.');
      } else if (error.code === 'auth/weak-password') {
        setError('La contraseña es demasiado débil. Debe tener al menos 6 caracteres.');
      } else {
        setError('Ocurrió un error al registrar la cuenta. Por favor, intenta de nuevo.');
      }
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra mensajes de error aquí */}
      <form onSubmit={handleRegister}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
