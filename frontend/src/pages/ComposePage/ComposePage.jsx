import React, { useState, useEffect } from "react";
import "./composePage.css";
import TitleView from "../../components/Compose/views/TitleView";
import ComposeView from "../../components/Compose/views/ComposeView";
import StatusView from "../../components/Compose/views/StatusView";
import Axios from "axios";

const ComposePage = ({ match }) => {
  const [book, setBook] = useState({});
  const [saveTimeout, setSaveTimeout] = useState(undefined);

  const loadBook = () => {
    Axios.get(`/books/${match.params.id}`).then(response => {
      if (!saveTimeout) {
        setBook(response.data);
      }
    });
  };

  useEffect(() => {
    setInterval(() => {
      if (!saveTimeout) {
        setSaveTimeout(
          setTimeout(() => {
            loadBook();
          }, 0)
        );
      }
    }, 1000);
  }, []);

  const updateBook = updatedBook => {
    Axios.put(`/books/${match.params.id}`, updatedBook).finally(() => {
      loadBook();
      clearTimeout(saveTimeout);
      setSaveTimeout(undefined);
    });
  };

  useEffect(() => {
    loadBook();
  }, []);

  return (
    <div className="composePage">
      <TitleView name={book.name} color={book.color} />
      <ComposeView
        value={book.content}
        onChange={content => {
          const updatedBook = { ...book, content };
          setBook({ ...book, content });
          if (saveTimeout) {
            clearTimeout(saveTimeout);
          }
          setSaveTimeout(
            setTimeout(() => {
              updateBook(updatedBook);
            }, 500)
          );
        }}
      />
      <StatusView saved={!saveTimeout} />
    </div>
  );
};
export default ComposePage;
