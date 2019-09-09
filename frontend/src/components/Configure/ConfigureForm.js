import React, { useState } from "react";
import "./configureForm.css";

import { withRouter } from "react-router-dom";

import BookView from "../Books/views/BookView";
import InputView from "../UI/views/InputView";
import ButtonView from "../UI/views/ButtonView";
import SelectView from "../UI/views/SelectView";
import { Colors } from "../../utils/colors";
import Axios from "axios";

export const ConfigureForm = withRouter(({ history }) => {
  const [data, setData] = useState({
    name: "My Book",
    color: "#B3E9C7",
    colorName: "mint"
  });
  return (
    <div id="configureBookForm">
      <BookView color={data.color} />
      <InputView
        value={data.name}
        placeholder="name"
        onChange={name => setData({ ...data, name })}
      />
      <SelectView
        options={Object.entries(Colors)}
        value={data.colorName}
        onChange={name => {
          setData({ ...data, color: Colors[name], colorName: name });
        }}
      />
      <ButtonView
        onClick={() => {
          const { color, name } = data;
          Axios.post("/books", { color, name })
            .catch(() => alert("Sorry, something went wrong."))
            .finally(() => history.push("/app/books"));
        }}
      >
        create
      </ButtonView>
    </div>
  );
});
