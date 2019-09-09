import React, { Component } from "react";
import "./bookView.css";

import { Link, withRouter } from "react-router-dom";
import Overdrive from "react-overdrive";
import ButtonView, { LinkButtonView } from "../../UI/views/ButtonView";

const BookView = ({ small, color, open, linkTo = "" }) => (
  <div className={`bookView ${small && "small"} ${open && "open"}`}>
    <Link to={linkTo} />
    <div className="flippable">
      <div className="bookCover" style={{ background: color }}>
        <div className="bookSpine" />
      </div>

      <div className="bookPage" />
      <div className="bookPage" />
      <div className="bookPage" />
      <div className="bookPage" />
      <div className="bookPage" />
      <div className="bookPage" />

      <div className="bookCover" style={{ background: color }}>
        <div className="bookSpine" />
      </div>
    </div>
  </div>
);

export const LogoutView = withRouter(({ history }) => {
  return (
    <ButtonView
      onClick={() => {
        localStorage.removeItem("token");
        history.push("/app");
      }}
    >
      logout
    </ButtonView>
  );
});

export const BooksView = ({ books }) => (
  <div className="booksView">
    {books.map(book => (
      <div className="book">
        <BookView linkTo={`/app/compose/${book.id}`} color={book.color} />
        <div className="text">{book.name}</div>
      </div>
    ))}
    <LinkButtonView to="/app/configure">create book</LinkButtonView>
    <LogoutView/>
  </div>
);

export default BookView;
