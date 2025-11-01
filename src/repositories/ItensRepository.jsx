import { db } from '../context/FirebaseConfig';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  orderBy
} from 'firebase/firestore';

export const ItensRepository = {
  async getItens() {
    const q = query(
        collection(db, "cardapio"),
        orderBy("nome", "asc")
    );

    const querySnapshot = await getDocs(q);
    const itens = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return itens;
  },

  async getItensByCategoria(categoria) {
    const q = query(
      collection(db, "cardapio"),
      where("categoria", "==", categoria)
    );
    const querySnapshot = await getDocs(q);
    const itens = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return itens;
  },

  async getItemById(id) {
    const itemDoc = doc(db, "cardapio", id);

    const itemSnapshot = await getDoc(itemDoc);

    return itemSnapshot.data();
  },

  async update(item) {
    const itemRef = doc(db, "cardapio", item.id);

    await updateDoc(itemRef, {
      nome: item.nome,
      descricao: item.descricao,
      preco: item.preco,
      categoria: item.categoria,
      peso: item.peso
    });
  },

  async create(item) {
    await addDoc(
      collection(db, "cardapio"), {
            nome: item.nome,
            descricao: item.descricao,
            preco: item.preco,
            categoria: item.categoria,
            peso: item.peso
        }
      );
  },

  async delete(item){
    await deleteDoc(doc(db, "cardapio", item));
  },
}