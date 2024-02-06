// firestoreService.js
import { db } from './firebase'; // Asegúrate de que la ruta sea correcta
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

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
