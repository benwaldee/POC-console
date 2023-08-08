import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loads from './components/Loads/Loads';
import HomePage from './components/HomePage';
import Users from './components/Users/Users';
import Deliveries from './components/Deliveries/Deliveries';
import Vins from './components/Vins/Vins';
import Damages from './components/Damages/Damages';
import Dealers from './components/Dealers/Dealers';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact={true} element={<HomePage />}></Route>
        <Route path='/loads' exact={true} element={<Loads />}></Route>
        <Route path='/users' exact={true} element={<Users />}></Route>
        <Route path='/deliveries' exact={true} element={<Deliveries />}></Route>
        <Route path='/vins' exact={true} element={<Vins />}></Route>
        <Route path='/damages' exact={true} element={<Damages />}></Route>
        <Route path='/dealers' exact={true} element={<Dealers />}></Route>
      </Routes>
    </BrowserRouter>

  );



}

export default App;
