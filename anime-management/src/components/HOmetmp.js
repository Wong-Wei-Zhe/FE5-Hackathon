import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import Task from "./Task";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  where,
  getDocs,
  update,
} from "firebase/firestore";
import { db } from "./App";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "@firebase/auth";
export default function Home() {
  const [episode, setEpisode] = React.useState("");

  const updateEpisode = async () => {
    //const testRef = doc(db, "Users", user.uid, "Anime");

    // const testRef = query(
    //   collection(db, "Users", user.uid, "Anime"),
    //   where("mailid", "==", 24)
    // );

    // updateDoc(testRef, {
    //   Episode: episode,
    // });

    // console.log(user.uid);
    // console.log(user.uid);
    // const q = query(
    //   collection(db, "Users", user.uid, "Anime"),
    //   where("mailid", "==", 22)
    // );
    // console.log(q.id);
    // updateDoc(q.id, {
    //   Episode: "2",
    // });
    const q = query(
      collection(db, "Users", user.uid, "Anime"),
      where("mailid", "==", 22)
    );

    //let docRef = doc(db, "Users", user.uid, "Anime", "lpMUuc4cRn3xc5EtU8b8");

    //console.log(docRef.data());
    // updateDoc(docRef, {
    //   Episode: "2",
    // });

    //let docRef = doc(db, "Users", user.uid, "Anime", "mailid");

    getDocs(q).then((querySnapshot) =>
      querySnapshot.forEach((docu) => {
        //console.log(docu.id);
        let docRef = doc(db, "Users", user.uid, "Anime", docu.id);
        updateDoc(docRef, {
          Episode: episode,
        });
      })
    );

    testCall();

    // db.collection("Users").doc(user.uid, "Anime").update({
    //   Episode: "4",
    // });

    // updateDoc(tRef, {
    //   Episode: "3",
    // });

    // getDocs(q).then((querySnapshot) =>
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id);
    //     updateDoc(doc, {
    //       Episode: "3",
    //     });
    //   })
    // );

    // await updateDoc("7B1ATAK6TMx2iG4ACnrp", {
    //   Episode: "3",
    // });

    // console.log(t.id);
    // updateDoc(t.id, {
    //   Episode: "3",
    // });

    // updateDoc(
    //   collection(db, "Users", user.uid, "Anime"),
    //   where("mailid", "==", 22),
    //   {
    //     Episode: episode,
    //   }
    // );

    // console.log(user.uid);
    // updateDoc(doc(db, "Users", user.uid, "Anime"), where("mailid", "==", 22), {
    //   Episode: episode,
    // });
  };

  let history = useHistory();
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth key");
    if (authToken) {
      history.push("Home");
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("Auth key");
    history.push("/");
  };

  const [tasks, setTasks] = useState([]);

  // const App = () => {
  let uid;
  const authentication = getAuth();
  const user = authentication.currentUser;

  onAuthStateChanged(authentication, (user) => {
    if (user) {
      user = user.uid;
    }
  });
  // useEffect(() => {
  //   console.log(user.uid);
  //   const q = query(
  //     collection(db, "Users", user.uid, "Anime"),
  //     where("mailid", "==", 22)
  //   );

  //   const unsub = onSnapshot(q, (querySnapshot) => {
  //     let tasksArray = [];
  //     querySnapshot.forEach((doc) => {
  //       tasksArray.push({ ...doc.data(), id: doc.id });
  //     });
  //     setTasks(tasksArray);
  //   });
  //   return () => unsub();
  // }, []);
  function testCall() {
    console.log(user.uid);
    const q = query(
      collection(db, "Users", user.uid, "Anime"),
      where("mailid", "==", 22)
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      let tasksArray = [];
      querySnapshot.forEach((doc) => {
        tasksArray.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tasksArray);
    });
    return () => unsub();
  }

  const toggleComplete = async (task) => {
    await updateDoc(
      doc(db, "Users", user.uid, "Anime"),
      where("mailid", "==", 22),
      {
        task: !task.completed,
      }
    );
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Users", user.uid, "Anime"));
  };
  // };

  return (
    // <div>
    //   <h1>HOME</h1>
    //   <Button color="red" onClick={handleLogout}>
    //     LOGOUT
    //   </Button>
    // </div>

    <div>
      <h1>HOME</h1>
      <input
        type="text"
        placeholder="Enter task todo..."
        onChange={(event) => setEpisode(event.target.value)}
      />
      <button onClick={updateEpisode}>UPDATE</button>
      <br></br>
      <br></br>
      <Button color="red" onClick={handleLogout}>
        LOGOUT
      </Button>
      <AddTask />
      <div className="task_container">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
