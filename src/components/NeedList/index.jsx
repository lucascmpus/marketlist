// Hooks
import { useEffect, useState } from "react";

// Externals Libs
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// FireBase
import { collection, getFirestore } from "firebase/firestore";
import { getItems } from "../../views/controllerItem";

import { app } from '../../services/firebase.js'


const db = getFirestore(app);
const userColletionRef = collection(db, "marketList-need");

export default function NeedList() {
  const [needItem, setNeedItem] = useState("");
  const [needList, setNeedList] = useState([]);

  useEffect(() => {
    getItems(userColletionRef, setNeedList);
  }, []);

  function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!needItem) {
      toast.info("Campo vazio!");
    } else {
      toast.success("Item adicionado!");
      setNeedItem("");
    }
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Nome do item"
          value={needItem}
          onChange={(e) => setNeedItem(e.target.value)}
        />
        <button>Adicionar</button>
      </form>
      <ul>
        {needList.map(({}) => (
          <li></li>
        ))}
      </ul>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
