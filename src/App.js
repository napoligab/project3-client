import './App.css';
/* import Private from './components/Private/Private';
import Anon from './components/Anon/Anon'; */
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import ConcertsPage from './pages/ConcertsPage/ConcertsPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import FundPage from './pages/FundPage/FundPage';
import FundedConcertsPage from './pages/FundedConcertsPage/FundedConcertsPage';  
import CreateConcert from './pages/CreateConcert/CreateConcert';
import MenuPage from './pages/MenuPage/MenuPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {

const [concerts, setConcerts] = useState([]);  


const getConcerts = async () => {
    try {
    let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/concerts`)
     console.log(response.data)
      setConcerts(response.data)
    } catch (err) {
    console.log(err)
    } 
   }

   useEffect(() => {
    getConcerts();
  }, []);

  return (
    <div className="App">

    <Navbar />

    <Routes>
      <Route path='/' element= {<HomePage />} />
      <Route path='/signup' element= {<SignupPage />} />
      <Route path='/login' element= {<LoginPage />} />
      <Route path='/concerts' element= {<ConcertsPage concerts={concerts}/>} />
      <Route path='/concerts/:concertId/fund' element= {<FundPage concerts={concerts}/>} />
      <Route path='/funded-concerts/:userId' element= {<FundedConcertsPage concerts={concerts}/>} />
      <Route path='/createconcerts' element= {<CreateConcert />} />
      <Route path='/menu' element= {<MenuPage />} />
      <Route path='/user/userId' element= {<ProfilePage />} />
      <Route path='*' element= {<ErrorPage />} />
    </Routes>
      
    </div>
  );
}

export default App;
