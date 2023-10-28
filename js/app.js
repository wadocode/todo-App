import { initializeApp } from "firebase-app"
import { Nav } from "./components/nav.js";
import tree from './state.js'
import { Home } from "./components/home.js";
import { Error } from "./components/error.js";
import { TodoForm } from "./components/todos/form.js";
import { TodoList } from "./components/todos/list.js";
import { TodoItem } from "./components/todos/todo.js";

let initializedApp


fetch('/__/firebase/init.json').then(async response =>{
  const config = await response.json();
  initializedApp = initializeApp(config);
})

export const app = initializedApp
// export const app = initializedApp(firebaseConfig)

import('./firebase/auth.js').then(function ({ auth }) {
  auth.onAuthStateChanged(function (user) {
    tree.select('user').set(
      JSON.parse(JSON.stringify(user))
    )
   
  })
})

import ('./firebase/users.js').then(({createUser})=>{
  tree.select('user').on('update', (e)=>{
    let user = e.data.currentData
    if(user){
      createUser(user)
    }
  })
})

customElements.define('app-nav', Nav)
customElements.define('app-home', Home)
customElements.define('app-error', Error)

customElements.define('app-todo-form', TodoForm)
customElements.define('app-todo-list', TodoList)
customElements.define('app-todo', TodoItem)

navigator.serviceWorker.register('/sw.js')