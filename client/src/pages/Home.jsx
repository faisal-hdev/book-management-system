/* eslint-disable no-unused-vars */
import React from "react";
import { useBooks } from "../context/BookContext";
import Hero from "../components/Hero";
import Shop from "./Shop";

const Home = () => {
  const { books, currentBook, loading, error } = useBooks();

  return (
    <div>
      <Hero />
      <Shop />
    </div>
  );
};

export default Home;
