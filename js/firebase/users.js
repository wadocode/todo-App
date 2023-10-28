import {getFirestore, doc, setDoc } from 'firebase-firestore';
import {app} from '../app.js'

export const db = getFirestore(app)

export function createUser(user){
const docRef = doc(db, 'users', user.uid)
return setDoc(docRef,{
  name:user.displayName,
  email:user.email,
  phot:user.photoURL,
  uid:user.uid

})
}