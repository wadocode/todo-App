import {getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot, query, where } from 'firebase-firestore';
import {app} from '../app.js'
import { TODO_STATUS } from './status.js';
import { auth } from './auth.js';

export const db= getFirestore(app)

export function createTodo (title){
const collectionRef = collection(db,"todos")
let todoJSON = {
  title,
  status: TODO_STATUS.ACTIVE,
  userId: auth.currentUser.uid
};
console.log(todoJSON);
return addDoc(collectionRef,todoJSON);
}

export async function getTodos(userId){
  const collectionRef = collection(db,"todos")
  const q = query(collectionRef, where('userId', '==', userId))
  const querySnapshot = await getDocs(q)
  const todos = []
  querySnapshot.forEach((doc)=>{
    let todoJSON={
      id:doc.id,
      ...doc.data()
    }
    todos.push(todoJSON)

  });
  console.log(todos)
 return todos
}
// Función para escuchar cambios en la lista de tareas
export function onListChange(callback) {
  const collectionRef = collection(db, 'todos');

  // Usamos onSnapshot para escuchar los cambios en la colección de tareas
  onSnapshot(collectionRef, (querySnapshot) => {
    const todos = [];

    querySnapshot.forEach((doc) => {
      let todoJSON = {
        id: doc.id,
        ...doc.data()
      };
      todos.push(todoJSON);
    });

    // Llamamos a la función de callback con la nueva lista de tareas cada vez que haya cambios
    callback(todos);
  });
}



export function deleteTodo(id){
  const docRef=doc(db, "todos", id)
  return deleteDoc(docRef)
}

export function updateTodo(id, data){
  const docRef = doc(db,"todos", id);
  updateDoc(docRef, data);
}
