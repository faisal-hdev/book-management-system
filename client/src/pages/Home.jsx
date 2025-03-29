import React, { useEffect, useState } from "react";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  console.log(books);
  return (
    <div>
      <h2 className="bg-red-50">Home</h2>
    </div>
  );
};

export default Home;
