import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Addexpense from './components/Addexpense';
import Addmember from './components/Addmember';
import Updateexpense from './components/Updateexpense';
import Viewexpense from './components/Viewexpense';
import Viewsummary from './components/Viewsummary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div className='app-container'>
      <div className='left-side'>
        <h1 className='app-title'>  EXPENSE TRACKER</h1>
       </div>

       <div className='right-side'>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/addmember"> Addmember</Link>
          <Link to="/addexpense"> Addexpense</Link>
          <Link to="/updateexpense"> Updateexpense </Link>
          <Link to="/viewexpense"> Viewexpense</Link>
          <Link to="/viewsummary"> Viewsummary</Link>

        </nav>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/addmember' element={<Addmember/>}/>
          <Route path='addexpense' element={<Addexpense/>}/>
          <Route path='upateexpense' element={<Updateexpense/>}/>
           <Route path="/viewexpense" element={<Viewexpense />} />
            <Route path="/viewsummary" element={<Viewsummary />} />
        </Routes>
       </div>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
