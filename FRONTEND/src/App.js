import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css';
import NavBar from './components/Navbar';
import Checkout from './pages/checkout/Checkout';
import Home from './pages/home/Home';
import Purchased from './pages/purchased-item/Purchased';
import { ShopContextProvider } from './context/shopcontext';
import Register from'./pages/auth/Register'
import Login from './pages/auth/Login';
import { useNavigate } from 'react-router-dom';

function App() {
  // const navigate=useNavigate()
  // if(localStorage.getItem('userinfo'))
  // {
  //     navigate('/Home')
  // }
  return (
    <div className="App">
      
       <Router>
       <ShopContextProvider>
         <NavBar/>
         
        <Routes>
        
          <Route path='/register' element={<Register/>}/> 
          <Route path="/" element={<Login/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/purchased-items" element={<Purchased/>}/>
          
        </Routes>
        </ShopContextProvider>
       </Router>
    </div>
  );
}

export default App;
