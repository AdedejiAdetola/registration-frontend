import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Success from "./components/Success";
import NotFound from "./components/NotFound";
import './App.css';


function App() {
  return (
    <div className="main-container">
          <BrowserRouter>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/success" exact element={<Success />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
    </div>
    
  );
}

export default App;
