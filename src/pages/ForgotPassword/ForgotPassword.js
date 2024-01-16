import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import axios from "axios";
import { Button, Toast } from "../../components";
import { Input } from "../../components";
import {
  MeseageIconLarge,
  QuestionIconLage,
  BackIcon,
} from "../../components/Icons";
// import { PasswordIcon, UserIcon } from "../../components/Icons/Icons";
import Logo from "../../assets/images/LogoLogin.png";
import styles from "./ForgotPassword.module.css";

const cx = classNames.bind(styles);
const ForgotPassword = () => {
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
  const handleSubmitForm = async (e) => {
    try {
      if (count < 4) {
    
        const res = await axios.post(
          "http://42.96.40.237:10710/vinorsoft/aicamera/v1.0/authenticator/login/",
          { username: userName, password: password }
        );

        localStorage.setItem("token", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        setCount(0);
        // navigate("/", { replace: true });
        window.location.reload();
      } else {
        const res = await axios.post(
          "http://42.96.40.237:10710/vinorsoft/aicamera/v1.0/authenticator/lock",
          { username: userName }
        );

        Toast.open(
          "Tài khoản của bạn đã bị khóa vui lòng liên hệ đến quản trị để mở khóa",
          "info"
        );
      }
    } catch (e) {
      console.log(e.response.data);

      setCount(count + 1);
      setIsSubmit(true);
      if (e.response.data.detail) {
        Toast.open("đăng nhập không thành công", "danger");
      }
    }
  };
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
          <h1>Quên mật khẩu</h1>
          <p className={cx("description")}>Nhập thông tin để lấy mật khẩu</p>
        </div>
        <form onSubmit={handleSubmitForm}>
          <Input
            placeholder="Email"
            onChange={handleChangeUserName}
            value={userName}
            rules={[
              {
                required: true,
                mess: "Tên tài khoản không được để trống",
              },
              {
                min: 6,
                mess: "Tài khoản từ 6 đến 50 ký tự!",
              },
              {
                max: 50,
                mess: "Tài khoản từ 6 đến 50 ký tự!",
              },
            ]}
            // icon={<UserIcon />}
            isSubmit={isSubmit}
          />
          <Input
            placeholder="Số điện thoại"
            type="text"
            onChange={handleChangePassword}
            value={password}
            rules={[
              {
                required: true,
                mess: "Mật khẩu không được trống!",
              },
              {
                min: 6,
                mess: "Mật khẩu từ 6 đến 20 ký tự!",
              },
              {
                max: 50,
                mess: "Mật khẩu từ 6 đến 50 ký tự!",
              },
            ]}
            // icon={<PasswordIcon />}
            isSubmit={isSubmit}
          />
          <Link style={{ textDecoration: "none" }} to={"/chat"}>
            <Button
              onClick={handleSubmitForm}
              className={cx("btn")}
              title="Lấy mật khẩu"
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

export default ForgotPassword;
