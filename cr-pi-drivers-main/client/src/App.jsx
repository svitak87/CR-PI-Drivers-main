import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../src/views/Landing/Landing";
import Register from "../src/components/Register";
import Home from "../src/views/Home/Home";
import Forgotpassword from "../src/components/Forgotpassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recover" element={<Forgotpassword />} />
      </Routes>
    </>
  );
}

export default App;
