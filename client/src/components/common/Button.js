import React from "react";
import ButtonCss from "./Button.module.css";

const Button = ({ buttonText, handleButtonHandler }) => {
  return (
    <div className={ButtonCss.buttonwrap}>
      <a className={ButtonCss.button} onClick={handleButtonHandler}>
        {buttonText}
      </a>
    </div>
  );
};

export default Button;
