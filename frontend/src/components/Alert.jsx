import css from "classnames";
import React from "react";
import { useState } from "react";
import style from "./Alert.module.css";

const Alert = ({ children, type, message }) => {
  const [show, setShow] = useState(true);

  const renderAlert = () => {
    return React.cloneElement(children);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };

  return (
    <>
      <div className={css(style.alert, style[type], !show && style.hide)}>
        <span className={style.closebtn} onClick={handleClose}>
          &times;
        </span>
        {children ? renderAlert() : message}
      </div>
    </>
  );
};

export default Alert;
