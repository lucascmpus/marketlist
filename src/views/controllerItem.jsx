import { addDoc, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { app } from "../../src/services/firebase.js";

const db = getFirestore(app);

export async function getItems(collection, setFunction) {
  const data = await getDocs(collection);
  setFunction(data.docs.map((doc) => (
    {...doc.data(), id: doc.id} 
  )))
}

export async function createItem(colletion, ...rest) {
  const item = await addDoc(colletion, {
    ...rest
  });  
};

export async function deleteInvetoryItem(id) {
  toast.warn("Item excluido!");
  const userDoc = doc(db, "marketList-inventory", id);
  await deleteDoc(userDoc);
}

export async function deleteNeedItem(id) {
  toast.warn("Item excluido!");
  const userDoc = doc(db, "marketList-need", id);
  await deleteDoc(userDoc);
}