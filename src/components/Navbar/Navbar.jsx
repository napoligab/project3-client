 import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/auth.context';
import {useContext} from 'react'; 
import nobackground from '../../nobackground.png'
import './navbar.css';
import menu from '../../menu.png';



function Navbar() {
  const {loggedIn, logout} = useContext(AuthContext);
 

  return (
    <nav className='Navbar'>

     {loggedIn && (
      <>
     
      <Link to="/menu">
      <img className="menu-icon" src={menu} alt='logo' />
      </Link>

      
      <img src={nobackground} alt='logo' className='logo'/>
     
     
      <button onClick={logout}>logout</button>
  
     
      </>
     )} 
     
     {!loggedIn && (
      <>
      
      <img src={nobackground} alt='logo' className='logo'/>
      </>
     )}


    </nav> 
  )
}

export default Navbar;