import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { DownIcons } from "../Icons";

import styles from "./SelectBox.module.css";

const cx = classNames.bind(styles);

const SelectBox = ({
  label,
  onChange,
  children,
  className,
  type = "normal",
  title,
  style,
  select,
  required,
  values,
}) => {
  const [value, setValue] = useState("Tất cả");
  const [isShow, setIsShow] = useState(false);

  const handleClick = () => {
    setIsShow(!isShow);
  };
  const handleOnChangeData = (value, label) => {
    setValue(label);
    if (onChange) {
      onChange(value, label);
    }
    setIsShow(!isShow);
  };
  useEffect(() => {
    if (select) {
      setValue(label);
    }
    if (values) {
      setValue(values);
    }
    else{
      setValue("Chọn")
    }
  }, [values]);
  return (
    <div className={cx("select-box", className)} style={{ ...style }}>
      {title && (
        <span
          className={cx(
            "title",
            required && value === "Lựa chọn" ? "title-error" : ""
          )}
        >
          {title}
        </span>
      )}
      <div
        className={cx(
          "select",
          type,
          required && value === "Lựa chọn" ? "error" : ""
        )}
      >
        <div
          onClick={handleClick}
          className={cx(
            "input-select",
            type === "normal" ? "input-normal" : ""
          )}
        >
          <div className={cx("input")}>
            {/* {label && <div className={cx("label")}>{label}</div>} */}
            <div className={cx("value")}>{value}</div>
          </div>
          <div className={cx("icon")}>
            <DownIcons />
          </div>
        </div>
         
          <div
            className={cx("data", type === "small" ? "ps-small" : "ps-normal")}
          >
            {React.Children.map(children, (child, i) => {
              return React.cloneElement(child, {
                index: i + 1,
                onChange: handleOnChangeData,
                size: type,
              });
            })}
          </div>
        
      </div>
      {value !== "Lựa chọn" ? (
        ""
      ) : required ? (
        <span className={cx("span-error")}>Vui lòng chọn trường này</span>
      ) : (
        ""
      )}
    </div>
  );
};
SelectBox.propTypes = {
  data: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  styles: PropTypes.any,
  select: PropTypes.bool,
  required: PropTypes.bool,
  values: PropTypes.any,
};
export default SelectBox;
