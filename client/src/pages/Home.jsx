/* eslint-disable no-unused-vars */
import React from "react";
import { useBooks } from "../context/BookContext";
import Hero from "../components/Hero";

const Home = () => {
  const { books, currentBook, loading, error } = useBooks();
  console.log(books);
  return (
    <div>
      <Hero />
    </div>
  );
};

export default Home;
