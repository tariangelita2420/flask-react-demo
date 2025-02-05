import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./views/Landing";
import SunrisePage from "./views/Sunrise";

// Routes to navigate between pages

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/sunrise" element={<SunrisePage />}/>
      </Routes>
    </BrowserRouter>
  );
}

