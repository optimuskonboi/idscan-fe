import React,{useEffect, useState} from "react";
import classNames from "classnames/bind";
import { SendIcon, MicIcon } from "../../../components/Icons";
import styles from "./FormQuestion.module.css";

const cx = classNames.bind(styles);
const FormQuestion = ({onChange,send,value,keyDown}) => {

  const handleOnChangeInput = (e)=>{
   
    onChange(e.target.value)
  }
  return (
    <form>
      <div className={cx("form-group")}>
        <input
          className={cx("form-control")}
          type={"text"}
          placeholder="Đặt câu hỏi"
          onChange={handleOnChangeInput}
          value={value}
          onKeyDown={keyDown}
        />
        <div className={cx("icon")}>
            <span ><MicIcon/></span>
            <span onClick={send}><SendIcon/></span>
        </div>
      </div>
    </form>
  );
};

export default FormQuestion;
