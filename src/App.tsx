import { useState } from "react";
import Login from "./components/Login";
import MaxWidthContainer from "./components/MaxWidthContainer";
import Register from "./components/Register";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import SessionCheck from "./utils/session";

function App() {
  const [register, setRegister] = useState<boolean>(false);  

  return (
    <Router>
      <SessionCheck />
      <div className="w-full flex justify-center">
        <MaxWidthContainer>
          <Routes>
            <Route
              path="/"
              element={
                <AnimatePresence>
                  {register ? (
                    <Register setRegister={setRegister} />
                  ) : (
                    <Login setRegister={setRegister} />
                  )}
                </AnimatePresence>
              }
            />
            <Route path="home" element={<Products />} />
          </Routes>
        </MaxWidthContainer>
      </div>
    </Router>
  );
}

export default App;
