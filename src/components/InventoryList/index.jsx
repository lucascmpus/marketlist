// Hooks React
import { useEffect, useState } from "react";

// Externals lib
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// FireBase
import { getFirestore, getDocs, collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { app } from "../../services/firebase";

export default function InventoryList() {
  const [nameItem, setNameItem] = useState("");
  const [amountItem, setAmountItem] = useState("");
  const [items, setItems] = useState([]);

  const db = getFirestore(app);
  const userColletionRef = collection(db, "marketList-inventory");

  useEffect(() => {
    async function getItems() {
      const data = await getDocs(userColletionRef);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getItems();
  }, [items]);

  async function createItem() {
    const item = await addDoc(userColletionRef, {
      nameItem, amountItem
    }); 
  };

  async function deleteItem(id) {
    toast.warn("Item excluido!");
    const userDoc = doc(db, "marketList-inventory", id);
    await deleteDoc(userDoc);
  }

  function handleSubmitForm(event) {
    event.preventDefault();

    if (!nameItem && !amountItem) {
      toast.info("Preencha os campos...");
    } else {
      createItem();
      toast.success("Item adicionado !");
      setAmountItem("");
      setNameItem("");
    };
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          placeholder="Nome do item"
          value={nameItem}
          onChange={(e) => setNameItem(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade disponível"
          value={amountItem}
          onChange={(e) => setAmountItem(e.target.value)}
        />
        <button>Adicionar</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.nameItem} - <span>{item.amountItem}</span>
            <button onClick={()=> deleteItem(item.id)}>x</button>
          </li>
        ))}
      </ul>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
