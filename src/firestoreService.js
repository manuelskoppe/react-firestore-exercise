// firestoreService.js
import { db } from './firebase';
import { collection, query, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore'; // Asegúrate de incluir deleteDoc y doc

// Función para obtener y ordenar canciones por año
export const getSongs = async () => {
  const songsRef = collection(db, 'songs');
  const q = query(songsRef, orderBy('year'));

  try {
    const querySnapshot = await getDocs(q);
    const songs = [];
    querySnapshot.forEach((doc) => {
      songs.push({ id: doc.id, ...doc.data() });
    });
    return songs;
  } catch (error) {
    console.error("Error al obtener documentos: ", error);
    return []; // Devuelve un array vacío en caso de error
  }
};


// Función para borrar una canción por id
export const deleteSong = async (songId) => {
  try {
    await deleteDoc(doc(db, 'songs', songId));
    console.log("Canción borrada con éxito");
  } catch (error) {
    console.error("Error al borrar la canción: ", error);
  }
};
