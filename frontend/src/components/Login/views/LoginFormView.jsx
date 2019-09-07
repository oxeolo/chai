import React, { useState } from "react";
import "./loginFormView.css";

import InputView from "../../UI/views/InputView";
import ButtonView, { LinkButtonView } from "../../UI/views/ButtonView";
import Axios from "axios";

const LoginFormView = ({ history }) => {
  const [creds, setCreds] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const login = () => {
    const { email, password } = creds;
    setLoading(true);
    Axios.post("/users/login", { email, password })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        history.push("/app/books");
      })
      .catch(err => {
          alert("Sorry, that's incorrect.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="loginForm">
      <InputView
        placeholder={"email"}
        value={creds.email}
        onChange={email => setCreds({ ...creds, email })}
      />
      <InputView
        placeholder={"password"}
        type={"password"}
        value={creds.password}
        onChange={password => setCreds({ ...creds, password })}
      />
      <ButtonView loading={loading} onClick={login}>
        login
      </ButtonView>
      <ButtonView loading={loading} onClick={login}>
        register
      </ButtonView>
    </div>
  );
};

export default LoginFormView;
