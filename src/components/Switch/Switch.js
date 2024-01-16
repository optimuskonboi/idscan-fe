import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from './Switch.module.css'

const cx = classNames.bind(styles)
const Switch = ({type="normal",value,onChange}) => {
  const [check,setCheck] = useState(false)
  const onChanges = (e)=>{
   
    onChange(e.target.checked)
    setCheck(e.target.checked)
  }
  return (
    <div>
      <label className={cx("switch",type)}>
        <input onChange={onChanges} checked={value} type="checkbox" />
        <span className={cx("slider","round")}></span>
      </label>
    </div>
  );
};

export default Switch;
