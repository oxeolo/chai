import React, { useState, useEffect } from "react";
import "./booksPage.css";
import { BooksView } from "../../components/Books/views/BookView";
import PageLogoView from "../../components/UI/views/PageLogoView";
import Axios from "axios";

const BooksPage = ({}) => {
  const [books, setBooks] = useState([]);
  const loadBooks = () => {
    Axios.get("/books").then(response => {
      setBooks(response.data);
    });
  };
  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div className="booksPage">
      <PageLogoView />
      <BooksView books={books} />
    </div>
  );
};

export default BooksPage;
