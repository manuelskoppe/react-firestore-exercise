import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';


function UserProfile() {
  const { currentUser, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(currentUser?.displayName || '');
  const [nationality, setNationality] = useState(currentUser?.nationality || '');
  const [image, setImage] = useState(null);
  const [profileUpdated, setProfileUpdated] = useState(false);

  useEffect(() => {
    console.log('CurrentUser en useEffect:', currentUser);
    if (currentUser) {
      setName(currentUser.displayName || '');
      setNationality(currentUser.nationality || '');
    }
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNationalityChange = (e) => {
    setNationality(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      console.log('Archivo para subir:', e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      console.log('No hay imagen para subir.');
      return null;
    }
    const storage = getStorage();
    const imageRef = storageRef(storage, `profileImages/${currentUser.uid}`);
    try {
      console.log('Iniciando subida de imagen...');
      const snapshot = await uploadBytes(imageRef, image);
      const photoURL = await getDownloadURL(snapshot.ref);
      console.log('Imagen subida, URL obtenida:', photoURL);
      return photoURL;
    } catch (error) {
      console.error('Error al subir imagen:', error);
      return null;
    }
  };

  const saveProfile = async () => {
    try {
      let photoURL = currentUser.photoURL;
      console.log('URL de foto actual:', photoURL);
      if (image) {
        console.log('Subiendo nueva imagen...');
        const uploadedPhotoURL = await uploadImage();
        console.log('URL de nueva imagen:', uploadedPhotoURL);
        if (uploadedPhotoURL) {
          photoURL = uploadedPhotoURL;
        }
      }

      const newUserProfile = {
        displayName: name,
        nationality: nationality,
        ...(photoURL && { photoURL }),
      };

      console.log('Actualizando perfil con:', newUserProfile);
      await setDoc(doc(getFirestore(), 'users', currentUser.uid), newUserProfile, { merge: true });
      console.log('Perfil actualizado en Firestore');

      // Actualiza el contexto global con los nuevos datos del perfil.
      updateUserProfile(newUserProfile);
      console.log('Perfil actualizado en el contexto de autenticación');

      setProfileUpdated(true);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setProfileUpdated(false);
    }
  };

  if (!currentUser) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Perfil de Usuario</h1>
      {profileUpdated && (
        <div className="text-center mb-6">
          <p className="font-semibold">Nombre: {name}</p>
          <p className="font-semibold">Nacionalidad: {nationality}</p>
          <img src={currentUser.photoURL || 'url_de_imagen_por_defecto'} alt="Foto de perfil" className="mx-auto my-4 w-32 h-32 object-cover rounded-full" />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
        <input type="text" value={name} onChange={handleNameChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nacionalidad:</label>
        <input type="text" value={nationality} onChange={handleNationalityChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Foto de perfil:</label>
        <input type="file" onChange={handleImageChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <button onClick={saveProfile} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Guardar Cambios</button>
      
    </div>
  );
      }  

export default UserProfile;