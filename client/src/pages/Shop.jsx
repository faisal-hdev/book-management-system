/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useBooks } from "../context/BookContext";
import BookGrid from "../components/BookGrid";
import CategoryNav from "../components/CategoryNav";
import SortBooks from "../components/SortBooks";
import Pagination from "../components/Pagination";
import axios from "axios";
import { backendBaseUrl } from "../../utils/baseURL";

const Shop = () => {
  const {
    books,
    currentBook,
    loading,
    error,
    filters,
    pagination,
    getBooks,
    clearCurrentBook,
    updateFilters,
  } = useBooks();

  const categories = [
    "All collections",
    "Fiction",
    "Adventure",
    "Romance",
    "Dystopain",
    "Historical",
    "Non-fiction",
  ];

  useEffect(() => {
    getBooks();
  }, [filters, getBooks]);

  const handleCategoryChange = (category) => {
    updateFilters({
      genre: category === "All collections" ? "" : category,
      page: 1,
    });
  };

  const handleSortChange = (sortConfig) => {
    updateFilters({
      sortBy: sortConfig.sortBy,
      order: sortConfig.order,
      page: 1,
    });
  };

  const handlePageChange = (newPage) => {
    updateFilters({
      page: newPage,
    });
  };

  const handleDeleteBook = async (id) => {
    try {
      axios.delete(`${backendBaseUrl}/book/${id}`);
      alert("Book deleted successfully");
      getBooks();
    } catch (error) {
      console.log(error.message);
      alert("Error deleting book");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <CategoryNav
          categories={categories}
          activeCategory={filters.genre || "All collections"}
          onCategoryChange={handleCategoryChange}
        />
        <div className="py-4 flex justify-end px-4">
          <SortBooks
            onSortChange={handleSortChange}
            currentSort={{
              sortBy: filters.sortBy,
              order: filters.order,
            }}
          />
        </div>
      </div>
      {/* Results Summary */}
      <div className="py-4 text-gray-600 px-4">
        Showing{" "}
        {pagination.totalBooks > 0
          ? (pagination.currentPage - 1) * filters.limit + 1
          : 0}
        -{" "}
        <span>
          {Math.min(
            pagination.currentPage * filters.limit,
            pagination.totalBooks
          )}{" "}
        </span>
        of {pagination.totalBooks} books
      </div>
      {/* Book card */}
      <div className="py-8 md:px-4">
        <BookGrid
          error={error}
          books={books}
          loading={loading}
          onDeleteBook={handleDeleteBook}
        />
        {/* Pagination */}
        <div className="mt-10">
          {pagination.totalPages > 1 && (
            <Pagination
              totalPages={pagination.totalPages}
              currentPage={pagination.currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
