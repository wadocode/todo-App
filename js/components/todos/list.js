import { LitElement, html, css } from 'lit'
export class TodoList extends LitElement{
  static get styles(){
    return css`
   ul{
    padding:0px;
   }

    `
  }

  static get properties(){
    return{
      todos:{type: Array},
      userId: { type: String }
    }
  }
  constructor(){
    super()
    this.todos = []
   
    import('../../firebase/todos.js').then(({ getTodos, onListChange })=>{
      getTodos().then(todos =>{
        this.todos= todos      
      }) 


      onListChange(newTodos => {
        this.todos = newTodos;
      });      
    })
   
  }
  
  render(){
    return html`    
    <app-todo-form></app-todo-form>
    <ul>
    ${
      this.todos.map(todo => html`
      <app-todo .todo=${todo}></app-todo>
     `)
    }
    </ul>
    `
  }

}