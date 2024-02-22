import React, { useState, useEffect } from 'react';
import { getSongs, deleteSong } from './firestoreService';
import { Link } from 'react-router-dom';

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const songsFromFirestore = await getSongs();
    setSongs(songsFromFirestore);
  };

  const handleDelete = async (songId) => {
    await deleteSong(songId);
    fetchSongs(); // Reload the songs after deleting
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter songs based on search term
  const filteredSongs = songs.filter(song =>
    song.genre.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Lista de Post</h2>
      <div className="flex justify-between mb-4">
        <Link to="/nuevo-post" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crear Nuevo Post</Link>
        <input
          type="text"
          placeholder="Buscar por género"
          className="p-2 border border-gray-300 rounded"
          onChange={handleSearchChange}
        />
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ir a la Página Principal</Link>
      </div>
      <div className="bg-white shadow-md rounded my-6">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Título</th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Autor</th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Año</th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Género</th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredSongs.map((song) => (
              <tr key={song.id} className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">
                  <Link to={`/songs/${song.id}`} className="text-blue-500 hover:text-blue-800">{song.title}</Link>
                </td>
                <td className="py-4 px-6 border-b border-grey-light">{song.artist}</td>
                <td className="py-4 px-6 border-b border-grey-light">{song.year}</td>
                <td className="py-4 px-6 border-b border-grey-light">{song.genre}</td>
                <td className="py-4 px-6 border-b border-grey-light">
                  <button onClick={() => handleDelete(song.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SongList;

