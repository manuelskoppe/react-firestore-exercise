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
  // Estado para manejar la actualización de los comentarios
  const [commentAdded, setCommentAdded] = useState(false);

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

  // Función para manejar la adición de un nuevo comentario
  const handleCommentAdded = () => {
    setCommentAdded(prev => !prev); // Cambia el estado para forzar la recarga de los comentarios
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  if (!song) {
    return <div className="flex justify-center items-center h-screen">No se encontró el post.</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen pt-30">
      <div className="w-full max-w-4xl p-4">
        <Link to="/" className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out mb-4 inline-block">Volver a la página principal</Link>
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
          <h2 className="text-3xl font-bold text-center mb-6">Detalles del Post</h2>
          {/* ... Resto de DetailBox ... */}
          {song.imageUrl && (
            <div className="flex justify-center p-4 mb-4">
              <img src={song.imageUrl} alt="Imagen del post" className="border border-blue-500 rounded-lg max-w-md h-auto" />
            </div>
          )}
          <div className="mb-4">
            <AddCommentForm songId={songId} onCommentAdded={handleCommentAdded} />
          </div>
          <div className="mb-4">
            <CommentList songId={songId} onCommentAdded={commentAdded} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailBox = ({ label, content, isContent, blueBackground }) => (
  <div className={`border border-blue-500 rounded-lg p-4 mb-4 ${blueBackground ? 'bg-blue-100' : 'bg-white'}`}>
    <p className="text-lg font-semibold">{label}: <span className="text-normal bg-white p-2 rounded">{content}</span></p>
    {isContent && (
      <div className="whitespace-pre-wrap text-sm rounded p-4 bg-gray-100 mt-2">{content}</div>
    )}
  </div>
);

export default SongDetail;
