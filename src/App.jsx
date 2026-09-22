import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./Home";
import Analysis from "./Analysis";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home / Resume Upload Page */}
        <Route path="/" element={<Home />} />

        {/* Resume Analysis Results Page */}
        <Route path="/analysis" element={<Analysis />} />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
