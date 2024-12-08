import {BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './views/Home.jsx';
import Contact from './views/Contact.jsx';
import NotFound from './views/NotFound.jsx';
import Register from './views/Register.jsx';
import Login from './views/Login.jsx';
import injectContext from './js/store/appContext.js';


 
const Layout = () => {
    const basename = process.env.BASENAME || "";
  return (
    <div>
        <BrowserRouter basename={basename}>
            <Routes>
                <Route exact path='/register' element={<Register/>}/>
                <Route exact path='/' element={<Login />} />
                <Route exact path='/home' element={<Home/>}/>
                <Route exact path='/contact' element={<Contact/>}/>
                <Route exact path='/*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default injectContext(Layout)