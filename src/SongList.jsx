// SongList.jsx
import React, { useState, useEffect } from 'react';
import { getSongs } from './firestoreService'; // Asegúrate de que la ruta sea correcta

const SongList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const songsFromFirestore = await getSongs();
      setSongs(songsFromFirestore);
    };

    fetchSongs();
  }, []);

  return (
    <div>
      <h2>Lista de Canciones</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.title} - {song.artist} ({song.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
