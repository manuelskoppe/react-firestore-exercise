import React, { useState, useEffect } from 'react';
import { getSongs, deleteSong, addLikeToPost } from './firestoreService';
import { Link } from 'react-router-dom';

const pageSize = 10; // Set the number of posts per page

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastVisible, setLastVisible] = useState(null); // For pagination
  const [isLoading, setIsLoading] = useState(false); // To show loading status

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async (newPage = false) => {
    setIsLoading(true);
    try {
      const { songs: newSongs, lastVisible: newLastVisible } = await getSongs(lastVisible, pageSize, newPage);
      console.log(newSongs); // Check if the songs are fetched correctly
      setSongs(newPage ? [...songs, ...newSongs] : newSongs);
      setLastVisible(newLastVisible);
    } catch (error) {
      console.error("Error fetching songs: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async (songId) => {
    await deleteSong(songId);
    fetchSongs(); // Reload the songs after deleting
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleNext = () => {
    if (!isLoading) {
      fetchSongs(true);
    }
  };

  const handleLike = async (postId) => {
    try {
      // Optimistically update the UI
      setSongs((prevSongs) => 
        prevSongs.map((song) => 
          song.id === postId ? { ...song, likeCount: (song.likeCount || 0) + 1 } : song
        )
      );
  
      // Then update the database
      await addLikeToPost(postId);
      console.log(`Like added to post ${postId}`);
    } catch (error) {
      console.error("Error adding like to post: ", error);
    }
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
      {isLoading && <p>Loading...</p>}
      <div className="bg-white shadow-md rounded my-6">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Título</th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Autor</th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Año</th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Género</th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Likes</th>
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
                <td className="py-4 px-6 border-b border-grey-light">{song.likeCount || 0}</td>
                <td className="py-4 px-6 border-b border-grey-light flex justify-between items-center">
                  <button onClick={() => handleDelete(song.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Borrar</button>
                  <button onClick={() => handleLike(song.id)} className="text-sm bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded ml-4">Me gusta</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleNext}
          disabled={isLoading || filteredSongs.length < pageSize}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Cargar más
        </button>
      </div>
    </div>
  );
  
};

export default SongList;
