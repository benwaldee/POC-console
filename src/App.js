import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loads from './components/Loads';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/loads' exact={true} element={<Loads />}></Route>
      </Routes>
    </BrowserRouter>

  );



}

export default App;
