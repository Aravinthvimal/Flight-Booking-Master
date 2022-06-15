import React from "react";
import planeImage from "../../assets/plane-download.jpg";
import WelcomeCss from "./Welcome.module.css";

const Welcome = () => {
  return (
    <div className={WelcomeCss.welcome_wrapper}>
      <div className={WelcomeCss.text}>
        <h1 className={WelcomeCss.text_heading}>
          Welcome To <span className={WelcomeCss.logo_color}>Fly High</span>
        </h1>
        <p className={WelcomeCss.text_para}>
        Once you have tasted flight, you will forever walk the earth with your eyes turned skyward, for there you have been, and there you will always long to return
        </p>
        <a className={WelcomeCss.button}>Start Booking</a>
      </div>
      <div className="image">
        <img
          className={WelcomeCss.image_main}
          src={planeImage}
          alt="plane flying"
        />
      </div>
    </div>
  );
};

export default Welcome;
