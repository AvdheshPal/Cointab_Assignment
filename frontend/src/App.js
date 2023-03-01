import logo from './logo.svg';
import './App.css';
import { Home } from './components/Home';
import { Routes,Route } from 'react-router-dom';
import { UserDetail } from './components/UserDetail';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<Home />} ></Route>
      <Route path="/userdetails" element={<UserDetail />} ></Route>
     </Routes>
    </div>
  );
}

export default App;
