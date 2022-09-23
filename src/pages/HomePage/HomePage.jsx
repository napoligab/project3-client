import { Link } from 'react-router-dom';
import './homepage.css';


function HomePage() {
  return (
    <div className='home-btn bg-auto'>
     
        <Link to="/login">
          <button className="btn btn-primary">login</button>
        </Link>

        <Link to="/signup">
          <button className="btn btn-primary">signup</button>
        </Link>
  
    </div> 
  );
}

export default HomePage;
