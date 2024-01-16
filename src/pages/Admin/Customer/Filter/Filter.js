import React from "react";
import classNames from "classnames/bind";
import styles from "./Filter.module.css";
import { DateTimePicker } from "../../../../components";
import { useState } from "react";

const cx = classNames.bind(styles);
const Filter = ({ onShowAdd,setTextSearch }) => {
  const ref = React.useRef()
  const [input,setInput] = useState('')
  const onChanges = (e) => {
    const value = e.target.value;
    setInput(value)
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
     setTextSearch(value)
    }, 300);
  };
  return (
    <div className={cx("content")}>
      <div className={cx("inputs")}>
        <input onChange={onChanges} value={input} className={cx("search")} placeholder="Tìm kiếm" />

        {/* <DateTimePicker title={"Ngày"} styles={{ width: 240, marginTop: 4 }} /> */}
        {/* <div className={cx("nc")}>Tìm kiếm nâng cao</div> */}
      </div>
      <div className={cx("actions")}>
        <button onClick={onShowAdd} className={cx("btn")}>
          Tạo mới
        </button>
      </div>
    </div>
  );
};

export default Filter;
