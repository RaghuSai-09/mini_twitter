import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import HomePage from './components/HomePage.jsx';
import { AuthProvider } from '../utils/auth';
import Auth from '../utils/controller';
import Profile from './components/Profile.jsx';
import Post from './components/Post';
import User from './components/Profiles/User.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Auth><HomePage /></Auth>} />
          <Route path="/profile" element={<Auth> <Profile /></Auth>} />
          <Route path='/profile/:id' element={<User/>}/>
        </Routes>
      </Router>
    </AuthProvider>
    )
 
    
}

export default App;
