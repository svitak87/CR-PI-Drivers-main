import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../src/views/Landing/Landing";
import Register from "../src/components/Register";
import Home from "../src/views/Home/Home";
import Forgotpassword from "../src/components/Forgotpassword";
import Details from "./views/Details/Details";
import Form from "./views/Form/Form"
import Footer from '../src/components/Footer'
import About from '../src/components/About'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recover" element={<Forgotpassword />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/create" element={<Form />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
