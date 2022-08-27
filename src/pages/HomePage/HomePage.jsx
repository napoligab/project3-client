import {Link} from 'react-router-dom';
import './homepage.css';

function HomePage() {
  return (
    <div>

     <div className='home-btn'>     
     <Link to='/login' >
      <button className='btn'>login</button>
     </Link> 


     <Link to='/signup' >
      <button className='btn'>signup</button>
     </Link>

     </div>

    </div>
  )
}

export default HomePage;