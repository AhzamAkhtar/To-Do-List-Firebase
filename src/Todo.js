import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  List,
  ListItemAvatar,
  ListItemText,
  ListItem,
  Button,
  Modal,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
firebase.initializeApp({
  apiKey: "AIzaSyBoDlL-Yh46dbp-9CO555JUKxIDG--Gcsg",
  authDomain: "to-do-list-bee59.firebaseapp.com",
  projectId: "to-do-list-bee59",
  storageBucket: "to-do-list-bee59.appspot.com",
  messagingSenderId: "482722184493",
  appId: "1:482722184493:web:0d359dc3109d1a060b67a4",
});
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const firestore = firebase.firestore();
function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setinput] = useState("");
  const updateTodo = () => {
    firestore.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h2>modal</h2>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setinput(event.target.value)}
          ></input>
          <Button variant="contained" color="secondary" onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>
      <List>
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary={props.todo.todo} secondary="Hurry Up ⏰ "/>
        </ListItem>
        <Button style={{marginLeft:"30px"}} variant="outlined" color="secondary" onClick={(e) => setOpen(true)}>Edit</Button>
        <div style={{marginLeft:"30px",marginTop:"5px"}}>
        <DeleteForeverIcon
          variant="contained"
          color="primary"
          onClick={(event) =>
            firestore.collection("todos").doc(props.todo.id).delete()
          }
        />
        </div> 
      </List>
    </>
  );
}

export default Todo;
