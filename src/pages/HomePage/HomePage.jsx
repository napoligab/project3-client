import {Link} from 'react-router-dom';
import nobackground from '../../nobackground.png';
import '../../App.css'; 

function HomePage() {
  return (
    <div>
      
     <div className='logo'>
     <img src={nobackground} alt='logo'/>
     </div>

     <div className='HomeButtons'>     
     <Link to='/login' >
      <button>login</button>
     </Link> 


     <Link to='/signup' >
      <button>signup</button>
     </Link>

     </div>

    </div>
  )
}

export default HomePage;