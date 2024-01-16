import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Button.module.css";

const cx = classNames.bind(styles);
const Button = ({ className, onClick, title,type }) => {
  const handleClick = (e) => {
    onClick(e);
  };
  return (
    <button onClick={handleClick}  className={cx("btn", `${className}`)} >
      {title}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default Button;
