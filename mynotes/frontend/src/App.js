import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom"


import './App.css';

import Header from './components/Header';
import Notepage from "./pages/Notepage";
import NotesListPages from './pages/NotesListPages';

function App() {
  return (
    <Router>
    <div className="container dark">
      <div className='app'>
      <Header/>
      <Routes>
      <Route path='/' exact element={<NotesListPages/>} />
      <Route path='/note/:id' element={<Notepage/>} />
      </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;
