import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import AddCommentForm from './AddCommentForm';
import CommentList from './CommentList';

const SongDetail = () => {
  let { songId } = useParams();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSong = async () => {
      setLoading(true);
      try {
        const songRef = doc(db, 'songs', songId);
        const songSnap = await getDoc(songRef);

        if (songSnap.exists()) {
          setSong({ id: songSnap.id, ...songSnap.data() });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error("Error al obtener el documento:", error);
      }
      setLoading(false);
    };

    fetchSong();
  }, [songId]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!song) {
    return <div>No se encontró el post.</div>;
  }

  return (
    <div>
      <Link to="/">Volver a la página principal</Link>
      <h2>Detalles del Post</h2>
      <p>Título: {song.title}</p>
      <p>Autor: {song.artist}</p>
      <p>Año: {song.year}</p>
      <p>Temática: {song.genre}</p>
      {/* Aquí se muestra el contenido del post */}
      <p>Contenido:</p>
      <div style={{ whiteSpace: 'pre-wrap' }}>{song.content}</div>
      {song.imageUrl && <img src={song.imageUrl} alt="Imagen del post" style={{ maxWidth: '100%' }} />}
      <AddCommentForm songId={songId} />
      <CommentList songId={songId} />
    </div>
  );
};

export default SongDetail;
