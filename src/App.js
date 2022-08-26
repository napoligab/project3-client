import './App.css';
/* import Private from './components/Private/Private';
import Anon from './components/Anon/Anon'; */
import {Routes, Route} from 'react-router-dom';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage'


function App() {
  return (
    <div className="App">

    <Routes>
      <Route path='/signup' element= {<SignupPage />} />
      <Route path='/login' element= {<LoginPage />} />
    </Routes>
      
    </div>
  );
}

export default App;
