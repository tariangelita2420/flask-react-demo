import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./views/Landing";
import SunrisePage from "./views/Sunrise";

// Routes to navigate between pages - App holds all my routes and / is the default path
// So when I go to localhost:5173/ landing page is the first component that comes up 
// localhost:5173/sunrise takes you to the SunrisePage component

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

