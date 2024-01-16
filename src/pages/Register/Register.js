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
import styles from "./Register.module.css";
import axiosClient from "../../services/axiosClient";

const cx = classNames.bind(styles);
const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const [isSubmit, setIsSubmit] = useState();
  const [count, setCount] = useState(0);
  const handleChangeEmail = (data) => {
    setEmail(data);
  };
  const handleChangePhone = (data) => {
    setPhone(data);
  };
  const handleChangeUserName = (data) => {
    setUserName(data);
  };
  const handleChangePassword = (data) => {
    setPassword(data);
  };
  const handleSubmitForm = async (e) => {
    try {
      const res = await axios.post("http://103.172.236.186:18003/authentication/sign_up", {
        username: userName,
        password: password,
        email: email,
        phoneNumber: phone,
      });
      console.log(res);
      if(res.data.code===200){
        localStorage.setItem("username",userName)
        Toast.open("Tạo tài khoản thành công. Vui lòng nhập mã xác thực","success")
        navigate('/register/verify',{
          replace:true
        })
        
      }
      else if(res.data.code === 400){
        Toast.open("Email của bạn dã đăng ký","danger")
      }
      else{
        Toast.open("Vui lòng nhập đầy đủ các trường","danger")
      }
    } catch (e) {
      console.log(e);
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
          <h1>Đăng ký</h1>
          <p className={cx("description")}>Chat GPT và Hơn thế nữa</p>
        </div>
        <form onSubmit={handleSubmitForm}>
          <Input
            placeholder="Email"
            onChange={handleChangeEmail}
            value={email}
            // rules={[
            //   {
            //     required: true,
            //     mess: "Tên tài khoản không được để trống",
            //   },
            //   {
            //     min: 6,
            //     mess: "Tài khoản từ 6 đến 50 ký tự!",
            //   },
            //   {
            //     max: 50,
            //     mess: "Tài khoản từ 6 đến 50 ký tự!",
            //   },
            // ]}
            // icon={<UserIcon />}
            isSubmit={isSubmit}
          />
          <Input
            placeholder="Tên tài khoản"
            type="text"
            onChange={handleChangeUserName}
            value={userName}
            // rules={[
            //   {
            //     required: true,
            //     mess: "Mật khẩu không được trống!",
            //   },
            //   {
            //     min: 6,
            //     mess: "Mật khẩu từ 6 đến 20 ký tự!",
            //   },
            //   {
            //     max: 50,
            //     mess: "Mật khẩu từ 6 đến 50 ký tự!",
            //   },
            // ]}
            // // icon={<PasswordIcon />}
            isSubmit={isSubmit}
          />
          <Input
            placeholder="Số điện thoại"
            type="text"
            onChange={handleChangePhone}
            value={phone}
            // rules={[
            //   {
            //     required: true,
            //     mess: "Mật khẩu không được trống!",
            //   },
            //   {
            //     min: 6,
            //     mess: "Mật khẩu từ 6 đến 20 ký tự!",
            //   },
            //   {
            //     max: 50,
            //     mess: "Mật khẩu từ 6 đến 50 ký tự!",
            //   },
            // ]}
            // icon={<PasswordIcon />}
            isSubmit={isSubmit}
          />
          <Input
            placeholder="Nhập mật khẩu"
            type="password"
            onChange={handleChangePassword}
            value={password}
            // rules={[
            //   {
            //     required: true,
            //     mess: "Mật khẩu không được trống!",
            //   },
            //   {
            //     min: 6,
            //     mess: "Mật khẩu từ 6 đến 20 ký tự!",
            //   },
            //   {
            //     max: 50,
            //     mess: "Mật khẩu từ 6 đến 50 ký tự!",
            //   },
            // ]}
            // icon={<PasswordIcon />}
            isSubmit={isSubmit}
          />

          <Button
            onClick={handleSubmitForm}
            className={cx("btn")}
            title="Đăng ký"
          />
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

export default Register;
