import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

const cx = classNames.bind(styles);

const Input = ({
  name,
  title,
  onChange,
  value,
  rules,
  type,
  icon,
  placeholder,
  isSubmit,
  row,
  register,
}) => {
  const [isChange, setIsChange] = useState(false);
  const onChanges = (e) => {
    if (!isChange) {
      setIsChange(true);
    }
    onChange(e.target.value);
  };
  const checkRules = (value) => {
    if (isChange && rules && rules[0].required) {
      if (!value) {
        return false;
      }
    }
    if (isChange && rules && rules[1]?.min > value.length) {
      return false;
    }
    if (isChange && rules && rules[2]?.max < value.length) {
      return false;
    }
    return true;
  };
  const getMess = (value) => {
    if (rules && rules[0].required) {
      if (!value) {
        return rules[0].mess ? rules[0].mess : "Vui lòng nhập trường này";
      }
    }
    if (rules && rules[1]?.min > value.length) {
      return rules[1].mess
        ? rules[1].mess
        : "Trường này nhập tối thiểu " + rules[1].min;
    }
    if (rules && rules[2]?.max < value.length) {
      return rules[2].mess
        ? rules[2].mess
        : "Trường này nhập tối da " + rules[2].max;
    }
  };
  useEffect(() => {
    if (isSubmit) {
      setIsChange(true);
    }
  }, [isSubmit]);
  return (
    <div className={cx("form-group", row ? 'form-row' : '')}>
      {icon && <span className={cx("icon")}>{icon}</span>}
      <div>
        <label>{title}</label>
        <input
          value={value ? value : ""}
          className={cx(
            "input",
            checkRules(value) ? "" : "input-error",
            icon ? "isIcon" : "",
          )}
          name={name}
          onChange={onChanges}
          type={type}
          placeholder={placeholder}
        />
      </div>
      {isChange && !checkRules(value) && (
        <span className={cx("error")}>{getMess(value)}</span>
      )}
    </div>
  );
};

Input.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  rules: PropTypes.array,
  type: PropTypes.string,
  icon: PropTypes.node,
  placeholder: PropTypes.string,
  isSubmit: PropTypes.any,
};

export default Input;
