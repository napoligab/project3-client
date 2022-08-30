import {Link} from 'react-router-dom';
import {useContext} from 'react';
import { AuthContext } from '../../context/auth.context';  

function MenuPage() {
  const {user} = useContext(AuthContext);  

 
  return (
    <div className='menu-div'>
     
        <Link className='menu-link' to={'/concerts'}>
        <h2>concerts</h2>
        </Link>
        <Link className='menu-link' to={`/funded-concerts/${user._id}`}>
        <h2>funded concerts</h2>
        </Link>
        <Link className='menu-link' to={`/user/${user._id}`}> 
        <h2>my account</h2></Link>

    
    </div>
  )
}

export default MenuPage;