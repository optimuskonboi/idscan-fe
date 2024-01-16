import React from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./SelectBox.module.css";

const cx = classNames.bind(styles)
const Select = ({ register, title, row }) => {
    return (
        <div className={cx(row ? 'input-select' : '')}>
            <label className={cx('title')}>{title ? title : 'xa'}</label>
            <select className={cx('select', register ? 'register' : '')} defaultValue={'Chọn'}>
                <option>Chọn</option>
                <option>Tùng</option>
                <option>Tùng</option>
            </select>
        </div>
    );
};

export default Select;