import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { useState } from "react";

const App = () => {
  const [isloggin,setIsloggin]=useState(false);
  return( 
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Home isloggin={isloggin} />} />
  <Route path="/login" element={<Login setIsloggin={setIsloggin} />} />
  <Route path="/Register" element={< Register/>} />
  <Route path="/Profile" element={<Profile/>}/>
  <Route path="/ProductList" element={<ProductList/>}/>
  <Route path="/product" element={<Product/>}/>
  <Route path="/Cart" element={<Cart/>}/>
  </Routes>
  </BrowserRouter>
  )
};

export default App;