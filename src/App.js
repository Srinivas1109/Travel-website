import "./App.css";
import Menu from "./Images/Menu/Menu.png";
import Close from "./Images/Menu/Close.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from './About';
import Contact from './Contact';
import Login from './Login';
import Home from './Home';
import {Travel} from './Travel.js';
import Userprofile from "./Userprofile";
import CreateAccount from './CreateAccount';
import ResetPassword from './ResetPassword';
import UserBooking from './UserBooking';

let globalMenu = document.getElementById('root')
globalMenu.addEventListener('click', ()=>{
  let side = document.getElementById('side-menu');
  let close = document.getElementById('Close-img');
  let menu = document.getElementById('Menu-img'); 
  close.style.display = "none";
  side.style.display = "none";
  menu.style.display = "block";
  menu.style.transition = ".8s";
})

let openMenu = ()=>{
  let side = document.getElementById('side-menu');
  let close = document.getElementById('Close-img');
  let menu = document.getElementById('Menu-img'); 
  close.style.display = "block";
  side.style.display = "block";
  menu.style.display = "none";
  menu.style.transition = ".8s";
}

let closeMenu = ()=>{
  let side = document.getElementById('side-menu');
  let close = document.getElementById('Close-img');
  let menu = document.getElementById('Menu-img'); 
  close.style.display = "none";
  side.style.display = "none";
  menu.style.display = "block";
  menu.style.transition = ".8s";
}

export default function App() {
  return (
    <Router>
      <img src={Menu} alt="" id = "Menu-img" onClick = {openMenu}/>  
      <img src={Close} alt="" id = "Close-img" onClick = {closeMenu}/>

      <div className="side-pannel" id = "side-menu">
          <nav>
              <Link className = "links"id = "menu-home"  to = "/" >Home</Link>
              <Link className = "links" id = "menu-about" to = "/about" >Who We Are</Link>
              <Link className = "links" id = "menu-contact" to = "/contact" >Contact Us</Link>
              <Link className = "links" id = "menu-login" to = "/login" >Login</Link>
              <Link className = "links" id = "menu-login" to = "/createAccount" >Sign Up</Link>
          </nav>
      </div>
      <Switch>
        <Route exact path="/" >
          <Home title = "Travel | Home"/>
        </Route>
        <Route exact path="/about" >
          <About name = "Srinivas" mobno = "9972641614" email = "vasuy1614@gmail.com" title = "Travel | About US"/>
        </Route>
        <Route exact path= "/contact">
          <Contact title = "Travel | Contact US"/>
        </Route>
        <Route exact path="/login">
          <Login title = "Travel | Login"/>
        </Route>
        <Route exact path="/travel">
          <Travel title = "Travel | Explore"/>
        </Route>
        <Route exact path="/userprofile">
          <Userprofile title = "Travel | Profile"/>
        </Route>
        <Route exact path="/createAccount">
          <CreateAccount title = "Travel | Create-Account"/>
        </Route>
        <Route exact path="/forgotPassword">
          <ResetPassword title = "Travel | Reset-Password"/>
        </Route>
        <Route exact path = "/booking">
          <UserBooking title = "Travel | Booking"/>
        </Route>
        </Switch>
        
    </Router>
  );
}
