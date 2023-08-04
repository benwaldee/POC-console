import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loads from './components/Loads';


function App() {

  const [loadArr, setLoadArr] = useState(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchLoads = async () => {
      try {

        const loads = await axios.get('https://kek6x29n3i.execute-api.us-east-1.amazonaws.com/all')
        setLoadArr(loads.data.loadArr)
        setLoading(true)

      } catch (error) {
        console.error("error w loads", error)
      }
    }

    fetchLoads()

  }, [])

  console.log(loadArr)



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/lists' exact={true} element={<Loads />}></Route>
      </Routes>
    </BrowserRouter>

  );



}

export default App;
