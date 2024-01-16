import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import axios from "axios";
import { Button, Toast } from "../../components";
import { Input } from "../../components";
import { MeseageIconLarge, QuestionIconLage } from "../../components/Icons";
// import { PasswordIcon, UserIcon } from "../../components/Icons/Icons";
import Logo from "../../assets/images/logo3 1.png";
import styles from "./Login.module.css";
import axiosClient from "../../services/axiosClient";
import { formatYYMMDD } from "../../utils";

const cx = classNames.bind(styles);
const Login = () => {
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
    try{
      e.preventDefault()
      const res = await axiosClient.post("/authentication/login",{
        username:userName,
        password:password
      },{
        headers:{
          // "Content-Type":"application/json",
        }
      })
      console.log(res.roles[0]);
      if(res){
        sessionStorage.setItem("time", Date.now().toString());
        sessionStorage.setItem("token",res.accessToken)
        sessionStorage.setItem("email",res.email)
        sessionStorage.setItem("role",res?.roles[0])
        sessionStorage.setItem("username",res.username)
        sessionStorage.setItem("avatar",res.avatar)
        sessionStorage.setItem("date",formatYYMMDD(res.dateLicense))
        if(res.roles[0] === "ROLE_superadmin"){
          navigate('/admin/customer')
        }
        else{
          navigate('/cccd')
        }
        window.location.reload()
        Toast.open(res.message,"success")
      }
    }
    catch(e){
      console.log(e);
      Toast.open("Tài khoản mật khẩu không chính xác","danger")

    }
  };
  useEffect(()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      navigate('/cccd')
    }
  },[])
  return (
    <div className={cx("container")}>
      <div id="__notification"></div>
      <div className={cx("content")}>
        <div className={cx("logo")}>
          <img src={Logo} alt="Logo" />
        </div>
        <div className={cx("title")}>
          <h1 className={cx("h1")}>Đăng nhập</h1>
          <p className={cx("description")}>Hệ thống quản lý căn cước công dân</p>
        </div>
        <form onSubmit={handleSubmitForm}>
          <Input
            placeholder="Tên đăng nhập"
            onChange={handleChangeUserName}
            value={userName}
            isSubmit={isSubmit}
          />
          <Input
            placeholder="Nhập mật khẩu"
            type="password"
            onChange={handleChangePassword}
            value={password}
            isSubmit={isSubmit}
          />

         
            <Button
              onClick={handleSubmitForm}
              className={cx("btn")}
              title="Đăng nhập"
            /> 
        </form>
        <div style={{display:"flex",justifyContent:"center",paddingTop:24}}>
          <Link style={{ textDecoration: "none" }} to={"/forgot-password"}>
            <p className={cx("forgot")}>Quên mật khẩu?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
