import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./Todo";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
firebase.initializeApp({
  apiKey: "AIzaSyBoDlL-Yh46dbp-9CO555JUKxIDG--Gcsg",
  authDomain: "to-do-list-bee59.firebaseapp.com",
  projectId: "to-do-list-bee59",
  storageBucket: "to-do-list-bee59.appspot.com",
  messagingSenderId: "482722184493",
  appId: "1:482722184493:web:0d359dc3109d1a060b67a4"
});
const firestore = firebase.firestore();
function Aspp() {
  useEffect(() => {
    firestore.collection("todos").orderBy("timestamp","desc").onSnapshot((snapshot) => {
      console.log(snapshot.docs.map(doc=>doc.data()))
      //settodos(snapshot.docs.map((doc) => doc.data().todo));
      settodos(snapshot.docs.map((doc) => ({id:doc.id,todo:doc.data().todo})));
    });
  },[]);
  const [todos, settodos] = useState([]);
  const [input, setinput] = useState("");
  const addtodos = (e) => {
    e.preventDefault();
    firestore.collection("todos").add({
      todo:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    //settodos([...todos, input]);
    setinput("");
  };
  return (
    <>
      <div style={{marginLeft:"10%"}}>
        <h1>Write Your Task!!</h1>
        {/*<input style={{marginLeft:"20%",width:"50%"}} value={input} type="text" 
      onChange={event=>setinput(event.target.value)} />*/}
        <FormControl>
          <InputLabel>✅ Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setinput(event.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          onClick={addtodos}
        >
          Add Todo
        </Button>
        <ul>  
          {todos.map((todo,timestamp) => (
            <Todo todo={todo} timestamp={timestamp} />
          ))}
        </ul>
        </div>
    </>
  );
}

export default Aspp;
