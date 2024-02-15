import React, { useState, useEffect } from 'react';
import { getSongs, deleteSong } from './firestoreService';
import { Link } from 'react-router-dom';

const SongList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const songsFromFirestore = await getSongs();
    setSongs(songsFromFirestore);
  };

  const handleDelete = async (songId) => {
    await deleteSong(songId);
    fetchSongs(); // Recarga las canciones después de borrar
  };

  return (
    <div>
      <h2>Lista de Post</h2>
      <Link to="/nuevo-post">Crear Nuevo Post</Link>
      <Link to="/">Ir a la Página Principal</Link>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {/* Envuelve el título en un Link para hacerlo clicable y navegar a la página de detalles */}
           
            <Link to={`/songs/${song.id}`}>{song.title}</Link> - {song.artist} ({song.year})
            <button onClick={() => handleDelete(song.id)}>Borrar</button>
          
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
