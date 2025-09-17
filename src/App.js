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
import { useState } from 'react';
function App() {
  const[members, setMembers]=useState([])

  const onaddmember=(name)=>{
    const newmember={id:Date.now().toString(),name}
    setMembers([...members, newmember])
  }

  const[expenses, setExpenses]=useState([])

  const onaddexpense=(expense)=>{
    const newexpense={...expense,id:Date.now().toString()}
    console.log("in onaddexpense", newexpense)
    setExpenses((prev)=>[...prev,newexpense])
  }
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
          <Route path='/addmember' element={<Addmember members={members} onaddmember={onaddmember}/>}/>
          <Route path='addexpense' element={<Addexpense members={members} onaddexpense={onaddexpense}/>}/>
          <Route path='updateexpense' element={<Updateexpense />}/>
           <Route path="/viewexpense" element={<Viewexpense expenses={expenses} members={members} />}/>
            <Route path="/viewsummary" element={<Viewsummary  expenses={expenses} members={members}/>} />
        </Routes>
       </div>
      
    </div>
    </BrowserRouter>
   
   
  );
}

export default App;
