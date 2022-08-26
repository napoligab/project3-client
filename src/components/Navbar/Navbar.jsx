import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/auth.context';
import {useContext} from 'react';


function Navbar() {
  const {loggedIn, user, logout} = useContext(AuthContext);

  return (
    <nav className='Navbar'>
      <Link to='/'>
       <button>Home</button>  
      </Link>

     {loggedIn && (
      <>
      <Link to ='/projects'>
       <button>Projects</button>  
      </Link>
      <span>{user.username}</span>
      <button onClick={logout}>Logout</button>
      </>
     )} 
     
     {!loggedIn && (
      <>
      <Link to='/login'>
       <button>Login</button>  
      </Link>
      <Link to='/signup'>
       <button>Signup</button>  
      </Link>

      </>
     )}


    </nav>
  )
}

export default Navbar;