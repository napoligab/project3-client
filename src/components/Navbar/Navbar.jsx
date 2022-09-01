 import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/auth.context';
import {useContext} from 'react'; 
import nobackground from '../../nobackground.png'
import './navbar.css';
import bars from '../../bars.png'



function Navbar() {
  const {loggedIn, logout} = useContext(AuthContext);
 

  return (
    <nav className="Navbar">

     {loggedIn && (
      <>
     
      <Link to="/menu">
      <img className="menu-icon" src={bars} alt='logo' />
      </Link>

      
      <img src={nobackground} alt='logo' className='logo'/>
     
     
      <button className="link text-white" onClick={logout}>logout</button>
  
     
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