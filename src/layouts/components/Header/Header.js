import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
// import { DownIcon, BellIcon } from "../../../components/Icons/Icons";
import axiosClient from "../../../services/axiosClient";
// import Logo from "../../../components/Icons/Logo";
import logo from "../../../assets/images/logoVN.png";
import image from "../../../assets/images/Rectangle_5676.png";
import styles from "./Header.module.css";
import ChangePassword from "../../../pages/ChangePassword/ChangePassword";

const cx = classNames.bind(styles);
const Header = () => {
  const [isLogout, setIsLogout] = useState(false);
  const ref1 = React.useRef();
  const ref = React.useRef();
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const handleShowInfo = (e) => {
    setIsShow(!isShow);
  };
  const handleLogout = (e) => {
    sessionStorage.clear();
    setIsLogout(!isLogout);
  };
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    if (isLogout) {
      navigate("/login");
    }
  }, [isLogout, navigate]);
  const handleClose = () => {
    setIsChange(!isChange);
  };
  // console.log(ref);
  // React.useEffect(() => {
  //   const handleClickOutSide = (e) => {

  //     if (e.target !== ref.current) {
  //       setIsShow(false)

  //     }
  //   };
  //   document.body.addEventListener("click", handleClickOutSide);
  //   return () => {
  //     document.body.addEventListener("click", handleClickOutSide);
  //   };
  // }, []);
  React.useEffect(() => {
    const handleClickOutSide = (e) => {
      if (e.target === ref1.current) {
        handleClose();
      }
    };
    document.body.addEventListener("click", handleClickOutSide);
    return () => {
      document.body.addEventListener("click", handleClickOutSide);
    };
  }, []);
  return (
    <>
      {isChange && (
        <>
          <div onClick={handleClose} className={cx("modal-changepass")}></div>
          <ChangePassword onClose={handleClose} />
        </>
      )}
      <header className={cx("header")}>
        <div className={cx("logo")}>
          <img src={logo} alt="Logo" />
          <p>Hệ thống quản lý, đọc và lưu trữ thông tin CCCD</p>
        </div>
        <div className={cx("user")}>
          <div onClick={handleShowInfo} className={cx("avatar")}>
            <img
              width="100%"
              style={{ objectFit: "cover", borderRadius: 10 }}
              src={image}
              alt="avatar"
            />
          </div>
          <div className={cx("name")}>
            <p
              ref={ref}
              style={{ cursor: "pointer", paddingRight: 12 }}
              onClick={handleShowInfo}
            >
              {sessionStorage.getItem("username")}
            </p>
            <div ref={ref} className={cx("logout")}>
              {/* <p className={cx("item")}>Thông tin tài khoản</p> */}

              <p onClick={handleClose} className={cx("item", "change")}>
                Đổi mật khẩu
              </p>

              <p onClick={handleLogout} className={cx("item")}>
                Đăng xuất
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
