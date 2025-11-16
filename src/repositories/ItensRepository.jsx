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
        collection(db, "itens"),
        orderBy("name", "asc")
    );

    const querySnapshot = await getDocs(q);
    const itens = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return itens;
  },

  async getItensByCategory(category) {
    const q = query(
      collection(db, "itens"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    const itens = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return itens;
  },

  async getItemById(id) {
    const itemDoc = doc(db, "itens", id);

    const itemSnapshot = await getDoc(itemDoc);

    return itemSnapshot.data();
  },

  async update(item) {
    const itemRef = doc(db, "itens", item.id);

    await updateDoc(itemRef, {
      name: item.name,
      description: item.description,
      value: item.value,
      category: item.category,
      weight: item.weight
    });
  },

  async create(item) {
    await addDoc(
      collection(db, "itens"), {
            name: item.name,
            description: item.description,
            value: item.value,
            category: item.category,
            weight: item.weight
        }
      );
  },

  async delete(item){
    await deleteDoc(doc(db, "itens", item));
  },
}