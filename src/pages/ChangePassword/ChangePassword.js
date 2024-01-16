import React from "react";
import classNames from "classnames/bind";
import styles from "./ChangePassword.module.css";
// import { BackIcon } from "../../components/Icons";
import { Input, Button, Toast, HeaderModal } from "../../components";
import { Link } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../../services/axiosClient";
const cx = classNames.bind(styles);
const ChangePassword = ({ onClose }) => {
  const [password, setPassWord] = useState({
    oldPass: "",
    newPass: "",
    retypePass: "",
  });
  const [show, setShow] = useState({
    oldPass: false,
    newPass: false,
    retypePass: false,
  });
  const handleChangePassword = (data, type) => {
    setPassWord({ ...password, [type]: data });
  };
  const handleShowPass = (e, type) => {
    setShow({
      ...show,
      [type]: !show[type],
    });
  };
  const handleChange = async () => {
    try {
      if (password.newPass === password.retypePass) {
        const res = await axiosClient.put(`/user/change_password`, {
          oldPassword: password.oldPass,
          newPassword: password.newPass,
        });
        // console.log(res);
        Toast.open(res.message, "success");
      } else {
        Toast.open("Mật khẩu nhập lại không đúng", "danger");
      }
    } catch (e) {
      Toast.open("Thay đổi mật khẩu không thành công", "danger");
    }
  };
  return (
    <div className={cx("form")}>
      <HeaderModal onClose={onClose} title={"Đổi mật khẩu"} />
      <div className="formChangePass">
        <Input
          placeholder="Nhập mật khẩu"
          title={"Nhập mật khẩu cũ"}
          onChange={(data) => handleChangePassword(data, "oldPass")}
          value={password.oldPass}
          type={show.oldPass ? "text" : "password"}
          onShowPass={(e) => handleShowPass(e, "oldPass")}
          show={show.oldPass}
        />
        <Input
          placeholder="Nhập mật khẩu"
          title={"Nhập mật khẩu mới"}
          onChange={(data) => handleChangePassword(data, "newPass")}
          value={password.newPass}
          //   isSubmit={isSubmit}
          type={show.newPass ? "text" : "password"}
          onShowPass={(e) => handleShowPass(e, "newPass")}
          show={show.newPass}
        />
        <Input
          title={"Nhập lại mật khẩu mới"}
          placeholder="Nhập mật khẩu"
          onChange={(data) => handleChangePassword(data, "retypePass")}
          value={password.retypePass}
          //   isSubmit={isSubmit}
          type={show.retypePass ? "text" : "password"}
          onShowPass={(e) => handleShowPass(e, "retypePass")}
          show={show.retypePass}
        />
        <Button
          onClick={handleChange}
          className={cx("btn")}
          title={"Xác nhận"}
        />
      </div>
    </div>
  );
};

export default ChangePassword;
