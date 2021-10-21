import { useState } from "react";
import { db } from "./App";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const AddTask = () => {
  const submit = (e) => {};

  const [Episode, setTitle] = useState("");
  const authentication = getAuth();

  const [status, setStatus] = useState("");

  const user = authentication.currentUser;

  console.log(status);
  let mailid = 22;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = authentication.currentUser;
    await addDoc(collection(db, "Users", user.uid, "Anime"), {
      mailid,
      Episode,
    });
    setTitle("");
  };

  const submitStatus = (status) => {};
  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Task</h3>
      <div className="input_container">
        <input
          type="text"
          placeholder="Enter task todo..."
          value={Episode}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="btn_container">
        <button>Add</button>
        <button
          onClick={() => {
            console.log("remove");
          }}
        >
          Remove
        </button>
      </div>
    </form>
  );
};

export default AddTask;
