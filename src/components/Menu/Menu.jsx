import {Link, useParams} from 'react-router-dom';
/* import {useContext} from 'react';
import { AuthContext } from '../../context/auth.context';  */

function MenuPage() {
 /*    const {user} = useContext(AuthContext);  */
     const {userId} = useParams();
 
  return (
    <div className='menu-div'>
     
        <Link className='menu-link' to={'/concerts'}>
        <h2>concerts</h2>
        </Link>
        <Link className='menu-link' to={`/funded-concerts/${userId}`}>
        <h2>funded concerts</h2>
        </Link>
        <Link className='menu-link' to={`/user/${userId}`}> 
        <h2>my account</h2></Link>

    
    </div>
  )
}

export default MenuPage;