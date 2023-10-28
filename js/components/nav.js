import { LitElement, html, css } from 'lit'
import tree from '../state.js'
export class Nav extends LitElement {

  static get properties() {
    return {
      user: { type: Object }
    }
  }

  static get styles() {
    return css`
    .user-login{
      display:flex;
      justify-content: space-between;
      align-items:center;
      width:100%;
    }
    .user-login .photo-profile{
    display:flex;
    align-items:center;
    column-gap:16px;
    }
    .photo-profile img{
      border-radius:50%;
      width:50px;
      height:50px; 

    }
       button{
      border:none;
      outline:none;
      padding:8px 16px;
      background:#ff5945;
      color:#fff;
      font-size:16px;
      cursor:pointer;
      border-radius:40px
    }
    .wellcome{
      display:flex;
      flex-direction:column;
      align-items:center;     
    }
    blockquote{
      background:hsl(235, 21%, 11%);
      color:#fff;
      width:90%;
      padding:8px 16px;
      border-radius:16px;
    }
    `

  }
  constructor() {
    super()
    this.user = null
    import('../firebase/auth.js').then(({ login, logout }) => {
      this.login = function () {
        login().then(() => { }).catch(err => {
          tree.select('error').set(err)
        })
      }
      this.login = login
      this.logout = logout
    })
    tree.select('user').on('update', (e) => {
      this.user = e.data.currentData;

    })
  }
  userLogin() {
    if (this.user) {
      return html`
    <div class= "user-login">
      <div class="photo-profile">    
       <img src=${this.user.photoURL} />  
       <p>${this.user.displayName}</p> 
       </div>
        <button @click=${function () { this.logout() }}>Cerrar Sesion</button>       
    
    
    </div>
       
    `;
    }
    return html`
    
    <div class= "wellcome">
     <div class= "user-login">
     <p>To-do-App</p>   
     <button @click=${function () { this.login() }}>Iniciar Sesion con Google</button>  
     </div>  
     <blockquote>"People do not decide their futures, they decide their habits and their habits decide their futures."<br>
     <span>F.M. Alexander</span>
     </blockquote>     
       </div>  
       
     `;
  }
  render() {
    return html`
    <nav>    
    <div>${this, this.userLogin()} </div>  
    </nav>

    `
  }
}