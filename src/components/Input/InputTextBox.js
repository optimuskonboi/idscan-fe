import React, { useState } from "react";
import classNames from "classnames/bind";
import PropTypes from 'prop-types'
import styles from './Input.module.css'
import { isValidateUserName, isValidatorEmail, isValidatorName } from "../../utils";
import { TickIcon } from "../Icons/Icons";

const cx = classNames.bind(styles)

const InputTextBox = ({title,onChange,value,placeholder,type,style,className,error,titleError,disabled,size="normal"}) => {
  const onChanges = (e)=>{
    onChange(e.target.value)
  }

  //const checkRules = (data) => {
    //if (isChange && name === "NAME") {
     // if (!data || data.trim().length === 0) {
        //return false
      //}
      //if (!isValidatorName(data)) {
       // return false
      //}
   // }
    //if (isChange && name === "USERNAME") {
     // if (!data || data.trim().length === 0) {
       // return false
      //}
     // if (!isValidateUserName(data)) {
      //  return false
     // }
   // }
   // if (isChange && name === "EMAIL") {
   //   if (!data || data.trim().length === 0) {
   //     return false
   //   }
   //   if (!isValidatorEmail(data)) {
   //     return false
   //   }
   // }
   // return true
 // }

  //const getMess = (data) => {
  ////  if (isChange && name === "NAME") {
     // if (!data || data.trim().length === 0) {
     //   return "Tên người dùng không được bỏ trống"
     // }
    //  if (!isValidatorName(data)) {
    //    return "Tên người dùng không hợp lệ"
    //  }
  //  }
  //  if (isChange && name === "USERNAME") {
    //  if (!data || data.trim().length === 0) {
     //   return 'Tên đăng nhập không được bỏ trống'
    //  }
   //   if (!isValidateUserName(data)) {
     //   return 'Tên đăng nhập không hợp lệ hoặc đã tồn tại'
    //  }
  // }
  //  if (isChange && name === "EMAIL") {
  //    if (!data || data.trim().length === 0) {
   //     return 'Địa chỉ Email không được bỏ trống'
   //   }
    //  if (!isValidatorEmail(data)) {
     //   return 'Địa chỉ Email không hợp lệ'
    //  }
  ////  }
//  }
  return (

    <div style={{...style,color:error?"#FF3300":"rgba(0, 0, 0, 0.7)"}}  className={cx("form-group")}>
      <label className={cx("title")}>{title}</label>
      <input
        value={value ? value : ""}
        className={cx("input-textbox",className,error?"input-error":"",size)}
        onChange={onChanges}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <span className={cx("span-error")} style={{position:"absolute"}}>{titleError}</span>}

    </div>
  );
};
InputTextBox.propTypes = {

    title: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    style:PropTypes.any,
    className:PropTypes.any,
    error:PropTypes.bool,
    titleError:PropTypes.string,
    disabled:PropTypes.bool
  };
export default InputTextBox;
