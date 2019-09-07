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
      setBook(response.data);
      if(saveTimeout){
          clearTimeout(saveTimeout);
          setSaveTimeout(undefined);
      }
    });
  };

  const updateBook = () => {
    Axios.put(`/books/${match.params.id}`, book).finally(() => {
      loadBook();
    });
  };

  useEffect(() => {
    loadBook();
  }, []);

  return (
    <div className="composePage">
      <TitleView title={book.title} color={book.color} />
      <ComposeView
        value={book.content}
        onChange={content => {
          setBook({ ...book, content });

          if (saveTimeout) {
            clearTimeout(saveTimeout);
          }
          setSaveTimeout(
            setTimeout(() => {
              updateBook();
            }, 2000)
          );
        }}
      />
      <StatusView saved={!saveTimeout} />
    </div>
  );
};
export default ComposePage;
