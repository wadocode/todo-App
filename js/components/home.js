import { LitElement, html, css } from 'lit'
import tree from '../state.js'
export class Home extends LitElement {
  static get styles(){
    return css`
    h1{
      font-size:2rem;
    }
    .todo-container{
      background:#fff;
      padding: 16px;
      border-radius: 16px;  
    }

    `
  }
  static get properties(){
    return{
      user: {type: Object}

    }
  }

  constructor(){
    super()
    tree.select('user').on('update', (e)=>{
      this.user=e.data.currentData;
    })
  }
  render(){
    if(!this.user) return 
    return html`
    <div class="todo-container">
    <h1>Lista de Tareas 📝 </h1>   
    <app-todo-list></app-todo-list>
    </div>
    
    
    `

  }


}