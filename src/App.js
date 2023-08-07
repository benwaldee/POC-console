import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loads from './components/Loads';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/loads' exact={true} element={<Loads />}></Route>
        <Route path='/' exact={true} element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>

  );



}

export default App;
