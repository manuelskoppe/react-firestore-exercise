import React, { useEffect, useState } from 'react';
import { getSongs } from './firestoreService';

const medals = ["🥇", "🥈", "🥉"];

const TopLikedSongs = () => {
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    fetchTopLikedSongs();
  }, []);

  const fetchTopLikedSongs = async () => {
    const { songs: fetchedSongs } = await getSongs(null, 3, false, 'likes');
    setTopSongs(fetchedSongs);
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Top Posts con Más Likes</h2>
      <div className="space-y-4">
        {topSongs.map((song, index) => (
          <div key={song.id} className="p-4 rounded-lg shadow-lg flex items-center space-x-4 bg-white">
            <div className="text-3xl">
              {index < 3 && medals[index]} {/* Muestra el emoji de medalla para los tres primeros */}
            </div>
            <div className="flex-1">
              <div className="text-xl font-semibold">{song.title}</div>
              <div className="text-gray-600">Por {song.artist}, {song.year}</div>
              <div>Likes: {song.likeCount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopLikedSongs;
