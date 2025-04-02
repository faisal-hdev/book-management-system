/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-prototype-builtins */
import React, { useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { backendBaseUrl } from "../../utils/baseURL";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [currentBook, setCurrentBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
    genre: "",
    minYear: "",
    maxYear: "",
    author: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "title",
    order: "asc",
    search: "",
  });

  const [pagination, setPagination] = useState({
    totalBooks: 0,
    currentPage: 1,
    totalPages: 2,
  });

  const getBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "") {
          params.append(key, value);
        }
      });

      const response = await axios.get(`${backendBaseUrl}/books?${params}`);
      setBooks(response.data.books);
      setPagination({
        currentPage: response.data.currentPage,
        totalBooks: response.data.totalBooks,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const clearCurrentBook = useCallback(() => {
    setBooks(null);
  }, []);

  const updateFilters = useCallback(async (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.hasOwnProperty("page") ? newFilters.page : 1,
    }));
  }, []);

  const getBookDetails = useCallback(async (bookId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${backendBaseUrl}/book/${bookId}`);
      setCurrentBook(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBooks();
  }, [filters]);

  const value = {
    books,
    currentBook,
    loading,
    error,
    filters,
    pagination,
    getBooks,
    clearCurrentBook,
    updateFilters,
    getBookDetails,
  };
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("Books must be withing a book provider");
  }
  return context;
};
