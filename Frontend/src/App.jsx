 
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import {BrowserRouter , Routes , Route}from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import View from "./pages/View"
 

function App() {
  return (
    <BrowserRouter>
      <Routes>
         
        <Route path="/" element={<View />}>
          <Route index element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
