import React from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./SelectBox.module.css";

const cx = classNames.bind(styles)
const SelectBoxItem = ({ label, value, ...props }) => {
  const { onChange,size } = props;
  const onChanges = (data,label)=>{
    onChange(data,label)
  }
  return (
      <div onClick={(e)=>onChanges(value,label)} className={cx("data-item")}>{label}</div>
  );
};
SelectBoxItem.propTypes = {
  value: PropTypes.string.isRequired,
  label:PropTypes.string.isRequired
};
export default SelectBoxItem;
