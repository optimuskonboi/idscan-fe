import React from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Close } from "../Icons/Icons";
import styles from "./Chip.module.css";

const cx = classNames.bind(styles);
const Chip = ({ title, onClose,Bgcolor,color }) => {
  const onClicks = (e) => {
    onClose();
  };
  return (
    <div style={{background:Bgcolor,color:color}} className={cx("content")} onClick={onClicks}>
      <div className={cx("chip")}>
        <span className={cx("title")}>{title}</span>
        <span className={cx("icon")} onClick={onClicks}>
          {onClose && <Close />}
        </span>
      </div>
    </div>
  );
};

Chip.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  color:PropTypes.string,
  Bgcolor:PropTypes.string,
};

export default Chip;
