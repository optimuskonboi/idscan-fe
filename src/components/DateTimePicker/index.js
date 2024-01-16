import React from 'react';
import classNames from 'classnames/bind';
import { DateTimeIcon } from '../Icons';
import styles from './DateTimePicker.module.css'

const cx = classNames.bind(styles)
const DateTimePicker = ({title,disabled,value,size="normal",onChange,styles,className}) => {
    return (
        <div style={{...styles}} className={cx("form-control")}>
            <span className={cx(`${size==="small"?"icon-small":"icon"}`)}><DateTimeIcon/></span>
            <label className={cx("title")}>{title}</label>
            <input disabled={disabled} value={value} type="date" onChange={onChange} className={cx("date",`${size}`,className)}/>
        </div>
    );
};

export default DateTimePicker;