import React, { useState } from "react";
import classNames from "classnames/bind";
import {
  HeaderModal,
  InputTextBox,
  DateTimePicker,
  SelectBox,
  SelectBoxItem,
  Toast,
} from "../../../../components";
import axiosClient from "../../../../services/axiosClient";
import styles from "./FormAdd.module.css";
import { useEffect } from "react";
import { isValidatorEmail,isValidatorPhone } from "../../../../utils";

const cx = classNames.bind(styles);
const FormAdd = ({ onToggle, onAdd, account,loading }) => {
  const [info, setInfo] = useState({
    sex: 0,
    username: "",
    password: "",
    phoneNumber: "",
    email: "",
    role: "",
    status: 1,
    customerId: "",
  });
 
  const [customers, setCustomers] = useState([]);
  const [retype, setRetype] = useState("");
  const handleAddAccount = () => {
    if (retype === info.password) {
      onAdd(info);
    }
    else if(!isValidatorEmail(info.email)){
      Toast.open("Vui lòng nhập đúng trường email","danger")
    }
    else if(account){
      onAdd(info);

    }
    else if(!info.role){
      Toast.open("Username không được để trống", "danger");

    }
    else if(info.password && retype){
      Toast.open("Mật khẩu nhập lại không khớp", "danger");
    }
    else if(!isValidatorPhone(info.phoneNumber)){
      Toast.open("Vui lòng nhập đúng định dạng của số điện thoại", "danger");

    }
  };
  useEffect(() => {
    async function getCustomer() {
      try {
        const res = await axiosClient.get(
          `/customers/all/search?page=1&limit=10000`
        );
        setCustomers(res.data);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    getCustomer();
  }, []);
  useEffect(() => {
    if (account) {
      setInfo(account);
    }
  }, [account]);
  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <HeaderModal
          onClose={onToggle}
          title={account ? "Chỉnh sửa tài khoản" : "Thêm mới tài khoản"}
        />
        <div className={cx("data")}>
          <div className={cx("form")}>
            <div className={cx("left")}>
               <InputTextBox
                placeholder={"Nhập"}
                style={{ width: "47%" }}
                title={"Username"}
                value={info.username}
                onChange={(data) => setInfo({ ...info, username: data })}
              />
             
              {!account && (
                <InputTextBox
                  style={{ width: "47%" }}
                  placeholder={"Nhập"}
                  title={"Mật khẩu"}
                  value={info.password}
                  onChange={(data) => setInfo({ ...info, password: data })}
                  type={"password"}

                />
              )}
                {!account && (
                <InputTextBox
                  style={{ width: "47%" }}
                  placeholder={"Nhập"}
                  title={"Nhập lại mật khẩu"}
                  value={retype}
                  onChange={(data) => setRetype(data)}
                  type={"password"}
                />
              )}
              <InputTextBox
                style={{ width: "47%" }}
                placeholder={"Nhập"}
                title={"Số điện thoại"}
                value={info.phoneNumber}
                onChange={(data) => setInfo({ ...info, phoneNumber: data })}
              />
           
             
             
              <InputTextBox
                style={{ width: "47%" }}
                placeholder={"Nhập"}
                title={"Email"}
                value={info.email}
                onChange={(data) => setInfo({ ...info, email: data })}
              />
              <div style={{ paddingTop: 18,width:"47%" }}>
                <p style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.7)" }}>
                  Khách hàng
                </p>
                <SelectBox
                  style={{ paddingTop: 6 }}
                  label={"Tất cả"}
                  type="normal"
                  select
                  onChange={(data) => setInfo({ ...info, customerId: data })}
                >
                  {customers.map((item, index) => {
                    return (
                      <SelectBoxItem
                        key={index}
                        value={item.customerId}
                        label={item.name}
                      />
                    );
                  })}
                </SelectBox>
              </div>
              <div style={{ paddingTop: 12,width:"96%" }}>
                <p style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.7)" }}>
                  Quyền
                </p>
                <SelectBox
                  style={{ paddingTop: 6 }}
                  label={"Chọn"}
                  type="normal"
                  select
                  // values={info.role}
                  onChange={(data) => setInfo({ ...info, role: data })}
                >
                  <SelectBoxItem value={"superadmin"} label={"Super Admin"} />
                  <SelectBoxItem value={"admin"} label={"Admin"} />
                  <SelectBoxItem value={"user"} label={"Nhân viên"} />
                </SelectBox>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("actions")}>
          <button disabled={loading} onClick={onToggle} className={cx("btn")}>
            Đóng  
          </button>
          <button disabled={loading} onClick={handleAddAccount} className={cx("btn", "primary")}>
            {account ? "Xác nhận" : " Tạo mới"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormAdd;
