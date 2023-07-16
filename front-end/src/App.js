import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/Profile';
import UpdateUser from './components/UpdateUser';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>

      <Route element={ <PrivateComponent /> } >
        <Route path="/" element={<Products />} />
        <Route path="/add" element={ <AddProduct /> } />
        <Route path="/update/:id" element={ <UpdateProduct />} />
        <Route path="/user/:id" element={ <UpdateUser />} />
        <Route path="/logout" element={<h1>Logout Component</h1>} />
        <Route path="/profile/:id" element={ <Profile /> } />
      </Route>

        <Route path="/signup" element={ <SignUp /> } />
        <Route path='/login' element={ <Login /> } />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
