import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { Button, Toast } from "../../../components";
import axios from "axios";
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
import axiosClient from "../../../services/axiosClient";

const cx = classNames.bind(styles);
const FormCode = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [code,setCode] = useState()
  const handleChangeUserName = (data) => {
    setUserName(data);
  };
  const handleChangePassword = (data) => {
    setPassword(data);
  };
  const handleSubmitForm = async () => {
    try{
      if(code.length  === 6){
        const res = await axios.post(`http://103.172.236.186:18003/authentication/validation_otp?username=${localStorage.getItem("username")}&limit=${code}`)
        if(res.data.code === 200){
          Toast.open("Xác thực thành công","success")
          navigate('/login')
        }
        else{
          Toast.open("Xác thực không thành công vui lòng nhập lại mã xác nhận","danger")
        }
      }
      else{
        Toast.open("Mã code của bạn đang bị thiếu","danger")
      }
    }
    catch(e){
      console.log(e);
    }
  };
  const handleGetCode = (data)=>{
    setCode(data)
  }
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
          <CodeVerify onGetCode= {handleGetCode}/>
          <div className={cx("wait")}>
            <Clock minutes={3}  isReFresh={false}/>
            {/* getTimeOut={onTimeOut} */}
            <div>Gửi lại</div>
          </div>
          
            <Button
              onClick={handleSubmitForm}
              className={cx("btn")}
              title="Xác nhận"
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

export default FormCode;
