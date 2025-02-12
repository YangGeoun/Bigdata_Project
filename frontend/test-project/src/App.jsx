import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Condition from "./pages/Condition";
import Navbar from "./Navbar";
import Product from "./pages/Product";
import User from "./pages/User";
import Login from "./pages/User/login";
import Signup from "./pages/User/Signup";

function App() {
  return (
    <div>
      <BrowserRouter>

        <Navbar/>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/condition" element={<Condition />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/user" element={<User />} />
        </Routes>
        
      </BrowserRouter>
    </div>
    
  );
}

export default App;
