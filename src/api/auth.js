import db from "../db/firestore";
import firebase from "firebase";
import "firebase/auth";

export const login = ({ email, password }) =>
  firebase.auth().signInWithEmailAndPassword(email, password);
