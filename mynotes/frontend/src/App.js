import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom"


import './App.css';
import { AuthProvider } from "./context/AuthContext";


import Notepage from "./pages/Notepage";
import NotesListPages from './pages/NotesListPages';
import Signuppage from "./pages/Signuppage";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
    <div className="container dark">
      <div className='app'>
      <AuthProvider>
      <Routes>
        
      <Route path='/' exact element={<PrivateRoute><NotesListPages/></PrivateRoute>} />
      <Route path='/note/:id' element={<PrivateRoute><Notepage/></PrivateRoute>} />
      <Route path='/signup' element={<Signuppage/> } />
      
      </Routes>
      </AuthProvider>
      </div>
      </div>
    </Router>
  );
}

export default App;
