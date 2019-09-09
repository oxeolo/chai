import React from "react";
import "./configureBookPage.css";
import PageLogoView from "../../components/UI/views/PageLogoView";
import BookView from "../../components/Books/views/BookView";
import InputView from "../../components/UI/views/InputView";
import { ConfigureForm } from "../../components/Configure/ConfigureForm";
//import LoginFormContainer from "../../components/Login/containers/LoginFormContainer";

const ConfigureBookPage = ({ history }) => {
  return (
    <div className="configureBookPage">
      <PageLogoView />
      <ConfigureForm/>
    </div>
  );
};

export default ConfigureBookPage;
