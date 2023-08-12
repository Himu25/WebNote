import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import NoteState from './Context/Note/NoteState';
import Login from './Components/Login';
import Notes from './Components/Notes';
import Signup from './Components/Signup';
import Protected from './Components/Protected';
import Footer from './Components/Footer';
import Error from './Components/Error';

function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <ToastContainer position="bottom-left" autoClose={1500} hideProgressBar={true} closeOnClick
          rtl={false} draggable pauseOnHover theme="light" />
        <Routes>
          <Route
            exact
            path="/"
            element={<Protected Component={Notes} />}
          />
          <Route
            path="/login"
            element={ <Login/>}
          />
          <Route
            path="/signup"
            element={<Signup/>}
          />
          <Route
            path="*"
            element={<Error/>}
          />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
