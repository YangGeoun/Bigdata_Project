import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Condition from "./pages/Condition";
import Navbar from "./Navbar";
import Product from "./pages/Product";

function App() {
  return (
    <div>
      <BrowserRouter>

        <Navbar/>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/condition" element={<Condition />} />
        </Routes>
        
      </BrowserRouter>
    </div>
    
  );
}

export default App;
