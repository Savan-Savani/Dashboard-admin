import { BrowserRouter, Route, Routes, Redirect, Link, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Login from "./component/authComponent/Login"
import "antd/dist/antd.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forget from './component/authComponent/Forget';
import Reset from './component/authComponent/Reset';
import Welcome from "./component/authComponent/Welcome"
import Showcase from './component/showcaseComponent/Showcase'

function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Showcase />} />
          {/* <Route exact path="/" element={localStorage.getItem("token") ? <Navigate to="/dashboard" /> : <Navigate to="/showcase" />} /> */}
          <Route exact path="/" element={localStorage.getItem("token") ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

          <Route path='/showcase' element={<Showcase />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/reset/:token" element={<Reset />} />



          <Route path="/dashboard/*" element={<PrivateRoute><Welcome /></PrivateRoute>} />

        </Routes>

      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}



function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}
export default App;
