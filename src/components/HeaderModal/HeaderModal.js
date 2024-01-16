import React from 'react';
import { Close } from '../Icons';
import PropTypes from "prop-types";
import classNames from 'classnames/bind';
import styles from './HeaderModal.module.css'

const cx = classNames.bind(styles)
const HeaderModal = ({title,onClose}) => {
    return (
        <div className={cx("header")}>
        <p className={cx("title")}>
          {title}
        </p>
        <span onClick={()=>onClose()} className={cx("icon")}>
          <Close />
        </span>
      </div>
    );
};
HeaderModal.propTypes = {
    title: PropTypes.string,
    onClose:PropTypes.func,
  };
  
export default HeaderModal;