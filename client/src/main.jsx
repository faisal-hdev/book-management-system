import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/ebooks" element={<div>Ebooks</div>} />
        <Route path="/membership" element={<div>Membership</div>} />
        <Route path="/books" element={<div>Shop Page</div>} />
        <Route path="/books/add" element={<div>Add books</div>} />
        <Route path="/cart" element={<div>Books Cart</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
