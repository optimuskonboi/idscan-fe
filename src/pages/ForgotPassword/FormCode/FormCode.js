import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { Button, Toast } from "../../../components";
import {
  MeseageIconLarge,
  QuestionIconLage,
  BackIcon,
} from "../../../components/Icons";
import CodeVerify from "./CodeVerify";
// import { PasswordIcon, UserIcon } from "../../components/Icons/Icons";
import Logo from "../../../assets/images/LogoLogin.png";
import styles from "./FormCode.module.css";
import Clock from "./Clock";

const cx = classNames.bind(styles);
const FormCode = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [isSubmit, setIsSubmit] = useState();
  const [count, setCount] = useState(0);
  const handleChangeUserName = (data) => {
    setUserName(data);
  };
  const handleChangePassword = (data) => {
    setPassword(data);
  };
  const handleSubmitForm = async (e) => {};
  return (
    <div className={cx("container")}>
      <div className={cx("gradient")}></div>
      <div className={cx("start-2")}></div>
      <div className={cx("start-1")}></div>
      <div className={cx("start-3")}></div>
      <div className={cx("start-4")}></div>
      <div className={cx("image")}></div>
      <div className={cx("cricle")}></div>
      <div className={cx("background")}></div>
      <div className={cx("icon")}>
        <MeseageIconLarge />
      </div>
      <div className={cx("icon-left")}>
        <QuestionIconLage />
      </div>
      <div id="__notification"></div>
      <div className={cx("content")}>
        <div className={cx("back")}>
          <Link to={"/login"}>
            <BackIcon />
          </Link>
        </div>
        <div className={cx("title")}>
          <h1>Xác thực tài khoản</h1>
          <p className={cx("description")}>
            Một mã 6 ký tự gửi về email của bạn
          </p>
        </div>
        <form onSubmit={handleSubmitForm}>
          <CodeVerify />
          <div className={cx("wait")}>
            <Clock minutes={3}  isReFresh={false}/>
            {/* getTimeOut={onTimeOut} */}
            <div>Gửi lại</div>
          </div>
          <Link style={{ textDecoration: "none" }} to={"/chat"}>
            <Button
              onClick={handleSubmitForm}
              className={cx("btn")}
              title="Xác nhận"
            />
          </Link>
        </form>

        <div className={cx("signup")}>
          <span>Bạn đã có tài khoản? </span>
          <Link style={{ textDecoration: "none" }} to={"/login"}>
            <span className={cx("signup-link")}>Đăng nhập</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormCode;
