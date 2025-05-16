import React from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Premium from './pages/Premium';
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import Forget from "./pages/Forget";
import OTP from "./pages/OTP";
import Newpassword from "./pages/Newpassword";
import Contact from "./pages/Contact";
import TemplateEditor from './pages/TemplateEditor';

import './css/footer.css';
import './css/Index.css';
import './css/Nav.css';
import './css/Premium.css';
import './css/Login.css';
import './css/Sign.css';
import './css/Forget.css';
import './css/OTP.css';
import './css/Newpassword.css';
import './css/Contact.css';
import './css/TemplateInputs.css';
import './css/Template1.css';
import './css/TemplateEditor.css';

import {BrowserRouter as Router,Routes,Route}from "react-router-dom";

function App() {
  
  return (
    <>
  <ToastContainer/>
<Router>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Index/>}/>
    <Route path='/premium' element={<Premium/>}/>
    <Route path='/login'  element={<Login/>}/>
    <Route path='/Contact' element={<Contact/>}/>
    <Route path='/Sign' element={<Sign/>}/>
    <Route path='/Forget' element={<Forget/>}/>
    <Route path='/OTP' element={<OTP/>}/>
    <Route path='/Newpassword' element={<Newpassword/>}/>
    <Route path="/editor/:templateId" element={<TemplateEditor />} />
  </Routes>
  <Footer/>
</Router>
    </>
  );
}

export default App;
