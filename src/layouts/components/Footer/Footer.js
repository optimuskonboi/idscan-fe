import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from "prop-types";
import styles from './Footer.module.css'

const cx = classNames.bind(styles);
const Footer = () => {
    return (
        <div style={{fontWeight:600, fontSize:16}}>
            Trung tâm hỗ trợ khách hàng 24/7 của Vinorsoft: <span style={{color:"#FF3300",fontWeight:600,fontSize:16}}>028 77708885</span> (Miễn phí cước gọi)
        </div>
    );
};

export default Footer;