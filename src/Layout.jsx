import {BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './views/Home.jsx';
import Contact from './views/Contact.jsx';
import NotFound from './views/NotFound.jsx';
import LoginRegister from './views/LoginRegister.jsx';
import Login from './views/Login.jsx';
import injectContext from './js/store/appContext.js';

 
const Layout = () => {
    const basename = process.env.BASENAME || "";
  return (
    <div>
        <BrowserRouter basename={basename}>
            <Routes>
                <Route path='/' element={<LoginRegister/>}/>
                <Route path='/login' element={<Login />} />
                <Route path='/home' element={<Home/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default injectContext(Layout)