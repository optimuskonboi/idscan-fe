import React from 'react';
import classNames from 'classnames/bind';
import PropType from 'prop-types'
import styles from './Alert.module.css'
// import alert from '../../assets/images/CanhBao.png'
import warning from '../../assets/images/Warning.png'


const cx = classNames.bind(styles)
const Alert = ({ onClose, onOk, type = "alert", title, content }) => {
    const handleCancel = () => {
        onClose()
    }
    const handleOk = () => {
        onOk()
    }
    return (
        <div className={cx("content")}>
            <div className={cx("container")}>
                <div className={cx("img")}>
                    <img src={warning} alt="Ảnh cảnh báo" />
                </div>
                <div className={cx("description")}>
                    <span className={cx("name")}>{title}</span>
                    <span className={cx("title")}>{content}</span>
                </div>
                <div className={cx("actions")}>
                    {type === "alert" ? <button onClick={handleCancel} className={cx("btn", "btn-cancel")}>Hủy bỏ</button> : ""}
                    <button onClick={handleOk} className={cx("btn", "btn-accept")}>Đồng ý</button>
                </div>
            </div>
        </div>
    );
};
Alert.propTypes = {
    onOk: PropType.func,
    onClose: PropType.func,
    type: PropType.string,
    title: PropType.string,
    content: PropType.string,
};
export default Alert;