import { LitElement, html, css } from 'lit'
import { TODO_STATUS } from '../../firebase/status.js';
export class TodoItem extends LitElement{

  static get styles(){
    return css`
    li{
      display:flex;
       justify-content:space-between;
      border-bottom: 2px solid #edeef0;
      list-style:none;
      font-size:1.8rem;
      user-select:none;
      cursor:pointer;
      align-items:center;
    }
    .todoContainer{
      display:flex;
      align-items:center;
      column-gap:8px;
     
    }
    .tarea-completada {
      text-decoration: line-through;
      color: #ccc;
    }
    .boton-circular {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      border: solid 1px rgb(255, 89, 69);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    
    .boton-circular-img {
      background-image: url('../../../images/icon-check.svg'); 
      background-size: cover;
      background-color: transparent;
      width:19px;
      height:15px;
      display:none
    }
    .boton-circular-check {
      background: linear-gradient(to bottom, rgb(255, 89, 69), rgb(255, 150, 120));
      transition: background 0.25s ease;
    }
  
    .boton-circular:hover{
      background: linear-gradient(to bottom, rgb(255, 89, 69), rgb(255, 150, 120));

    }
    .visible {
      display: block;
    }
    .btnClose{
      width: 25px;
      height: 25px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition:background 0.25s ease;
    }
    .btnClose img{
      width:50%;
      height:50%;
    }
    .btnClose:hover{
      background:rgb(237, 238, 240)
    }
    p{
      font-size:1.6rem;
    }
          
    
    `
  }
  static get properties() {
    return {
      todo: { type: Object }
    };
  }

  constructor(){
    super()
    import("../../firebase/todos.js").then(({deleteTodo, updateTodo})=>{
      this.deleteTodo = deleteTodo
      this.updateTodo = updateTodo
    })
  }

  // check(e){
  // this.updateTodo(this.todo.id,{
  // status: TODO_STATUS.COMPLETED
  
  //  })

  // }
  check(e) {
    const newStatus =
      this.todo.status === TODO_STATUS.ACTIVE
        ? TODO_STATUS.COMPLETED
        : TODO_STATUS.ACTIVE;
  
    this.updateTodo(this.todo.id, { status: newStatus });
  }
  


  render(){
    const isCompleted = this.todo.status === TODO_STATUS.COMPLETED;
    const buttonCheck = `boton-circular ${isCompleted ? 'boton-circular-check' : ''}`;
    const buttonImg = `boton-circular-img ${isCompleted ? 'visible' : ''}`;
    return html`

  <li>
    <div class='todoContainer'>
      <div class="${buttonCheck}" @click=${() => this.check()}>
        <div class="${buttonImg}"></div>
      </div>
      <p class="${this.todo.status === TODO_STATUS.COMPLETED ? 'tarea-completada' : ''}">
        ${this.todo.title}
      </p>  
    </div>
    <div class='btnClose' @click=${ ()=> this.deleteTodo(this.todo.id)}> 
    <img src="../../../images/icon-cross.svg" alt="boton cerrar">
     </div>      
  </li>
   
    `
    
  }
}