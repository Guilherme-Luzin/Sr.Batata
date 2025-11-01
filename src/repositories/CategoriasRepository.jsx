// CategoriasRepository.js
import { db } from '../context/FirebaseConfig';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  updateDoc,
  addDoc,
  deleteDoc
} from 'firebase/firestore';

export const CategoriasRepository = {
  async getCategorias() {
    const q = query(collection(db, "categorias"), orderBy("nome", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getCategoriaById(id) {
    const categoriaDoc = doc(db, "categorias", id);
    
    const categoriaSnapshot = await getDoc(categoriaDoc);

    return categoriaSnapshot.data();
  },

  async update(categoriaId, nome) {
    const categoriaRef = doc(db, "categorias", categoriaId);
    await updateDoc(categoriaRef, {
      nome
    });
  },

  async create(nome) {
    await addDoc(
      collection(db, "categorias"), {
            nome
        }
      );
  },

  async delete(categoria){
    await deleteDoc(doc(db, "categorias", categoria));
  },
};
