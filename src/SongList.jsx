// SongList.jsx
import React, { useState, useEffect } from 'react';
import { getSongs, deleteSong } from './firestoreService'; // Asegúrate de importar deleteSong

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
      <h2>Lista de Canciones</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.title} - {song.artist} ({song.year})
            <button onClick={() => handleDelete(song.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
