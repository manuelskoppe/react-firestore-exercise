import React from 'react';
import SongForm from './SongForm'; // Asegúrate de que la ruta sea correcta
import SongList from './SongList'; // Importa el componente SongList

function App() {
  return (
    <div className="App">
      <h1>Añadir Nueva Canción</h1>
      <SongForm />
      {/* Renderiza el formulario para añadir canciones */}
      
      <h2>Lista de Canciones</h2>
      <SongList />
      {/* Renderiza la lista de canciones existentes */}
    </div>
  );
}

export default App;
