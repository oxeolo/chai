import React from "react";
import "./loginPage.css";
import PageLogoView from "../../components/UI/views/PageLogoView";
import LoginFormContainer from "../../components/Login/containers/LoginFormContainer";

const LoginPage = ({ history }) => {
  if(localStorage.getItem("token")){
    history.push("/app/books");
  }
  return (
    <div className="loginPage">
      <PageLogoView />
      <LoginFormContainer history={history} />
    </div>
  );
};

const Circle = () => <div className="circle" />;

export default LoginPage;
