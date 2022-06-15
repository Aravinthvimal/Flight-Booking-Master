import React from "react";
import PlaneLogo from "../../assets/plane-logo.png";
import Button from "./Button";
import HeaderCss from "./Header.module.css";

import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = (redirectUrl) => {
    navigate(redirectUrl);
  };

  return (
    <div className={HeaderCss.headerWrap}>
      <div>
        <img className={HeaderCss.logo} src={PlaneLogo} alt="plane logo" />
      </div>
      <div className={HeaderCss.buttons}>
        <Button
          buttonText="Book Ticket"
          handleButtonHandler={() => handleClick("/booking")}
        />
        <Button
          buttonText="List Booking"
          handleButtonHandler={() => handleClick("/list-bookings")}
        />
        <Button 
         buttonText="Login" id="login-btn"
         handleButtonHandler={() => handleClick("/login")}
        />
      </div>
    </div>
  );
};

export default Header;
