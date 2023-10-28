import { LitElement, html, css } from 'lit'
export class TodoForm extends LitElement{

  static get styles(){
    return css`
    .new-todo{
      display:flex;
      justify-content:space-between;
      background:#edeef0;
      border-radius:30px;
      margin-bottom:25px;
    }
    input{
      flex:1;
      border:none;
      outline:none;
      background:transparent;
      padding:10px 10px 10px 20px;
      font-size:1.6rem;
      width:100%
      
    }
    button{
      border:none;
      outline:none;
      padding:16px 32px;
      background:#ff5945;
      color:#fff;
      font-size:16px;
      cursor:pointer;
      border-radius:40px
    }

    `
  }

  static get properties(){
    return{
      title:{type:String}
    }

  }

  constructor(){
    super()
    import('../../firebase/todos.js').then(({ createTodo})=>{
      this.createTodo = createTodo
    })


  }

  create(e){
    e.preventDefault()
    this.createTodo(this.title)
    const inputElement = this.shadowRoot.querySelector('input'); 
    if (inputElement) {
      inputElement.value = ''; 
      inputElement.focus(); 
    }
  }
  render(){
    
    return html`
   
   <form @submit=${(e) => this.create(e)}>
   <div class="new-todo">
   <input type='text' placeholder='Tarea ...' @input=${(e)=>{this.title = e.target.value}}/>
   <button type='submit'> Agregar </button> 
   </div>  
   </form>   
   `
  }
}