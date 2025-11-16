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

export const CategoriesRepository = {
  async getCategories() {
    const q = query(collection(db, "categories"), orderBy("name", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getCategoryById(id) {
    const categoryDoc = doc(db, "categories", id);
    
    const categorySnapshot = await getDoc(categoryDoc);

    return categorySnapshot.data();
  },

  async update(categoryId, name) {
    const categoryRef = doc(db, "categories", categoryId);
    await updateDoc(categoryRef, {
      name: name
    });
  },

  async create(name) {
    await addDoc(
      collection(db, "categories"), {
            name
        }
      );
  },

  async delete(category){
    await deleteDoc(doc(db, "categories", category));
  },
};
