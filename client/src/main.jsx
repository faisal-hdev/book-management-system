import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import EditBook from "./pages/EditBook.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import AddBooks from "./pages/AddBooks.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/ebooks" element={<div>Ebooks</div>} />
        <Route path="/membership" element={<div>Membership</div>} />
        <Route path="/books" element={<Shop />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/add" element={<AddBooks />} />
        <Route path="/cart" element={<div>Books Cart</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
