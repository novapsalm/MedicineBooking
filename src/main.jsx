import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './LandingPage.jsx'
import Cart from './Cart.jsx'
import payment from './payment.jsx'
import ProductPage from './Product.jsx'
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom'
import About from './About.jsx'
import {App} from './login.jsx'
import ProductDetails from './ProductDetails.jsx'
import AdminHome from '../src/AdminHome';
//import PrivateRoutesUser from '../src/assets/PrivateRoutesUser';
//import AuthContext from '../src/assets/AuthContext';
//import PrivateRoutesAdmin from '../src/assets/PrivateRoutesAdmin';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
      {/* <Route element={<PrivateRoutesUser />} > */}
        <Route path="/" element={<Home/>}></Route>
        <Route path='/login' element={<App/>} ></Route>
        <Route path='/product/:id' element={<ProductPage/>}></Route>
        <Route path='/payment' element={<payment/>}></Route>
        <Route path='/LandingPage' element={<Home/>}></Route>
        <Route path='/About' element={<About/>}></Route>
        <Route path='/products/:name/:id' element={<ProductDetails/>}></Route>
        <Route path='/Cart/:id' element={<Cart/>}></Route>
      {/* </Route>  */}
          

      {/* <Route element={<PrivateRoutesAdmin />} >  */}

        <Route path='/AdminHome' element={<AdminHome />}></Route> 
       {/* </Route>  */}
      </Routes>
    </Router>
  </React.StrictMode>
)
