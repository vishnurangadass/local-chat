import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Signup from './components/Signup';
import Chat from './components/Chat';
import Signin from './components/Signin';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {authenticated ? (
            <Chat user={user} />
          ) : (
            <Routes>
              <Route path="/signin" element={<Signin setAuthenticated={setAuthenticated}  setUser={setUser} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Signin setAuthenticated={setAuthenticated} />} />
            </Routes>
          )}
        </header>
      </div>
    </Router>
  );
}

export default App;
