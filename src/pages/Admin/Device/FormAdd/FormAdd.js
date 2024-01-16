import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import {
  HeaderModal,
  InputTextBox,
  DateTimePicker,
  Toast,
  SelectBox,
  SelectBoxItem,
} from "../../../../components";
import axiosClient from "../../../../services/axiosClient";
import styles from "./FormAdd.module.css";

const cx = classNames.bind(styles);
const FormAdd = ({ handleAdd, onClose, loading }) => {
  const [data, setData] = useState({
    serialNumber: "",
    dateCreate: "",
    dateRemove: "",
    customerId: "",
  });
  const [customers, setCustomers] = useState([]);
  const handleAdvice = () => {
    if (handleAdd) {
      if (data.dateCreate > data.dateRemove) {
        Toast.open(
          "Vui lòng chọn lại ngày sử dụng nhỏ hơn ngày hết hạn",
          "danger"
        );
      } else {
        handleAdd(data);
      }
    }
  };
  useEffect(() => {
    async function getCustomer() {
      try {
        const res = await axiosClient.get(
          `/customers/all/search?page=1&limit=10000`
        );
        setCustomers(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    getCustomer();
  }, []);
  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <HeaderModal onClose={onClose} title={"Thêm thiết bị mới"} />
        <div className={cx("data")}>
          <div className={cx("form")}>
            <div className={cx("left")}>
              <InputTextBox
                style={{ width: "100%" }}
                placeholder={"Nhập"}
                title={"Số seri"}
                value={data.serialNumber}
                onChange={(value) => setData({ ...data, serialNumber: value })}
              />
              <DateTimePicker
                styles={{ width: "100%" }}
                className={cx("item")}
                title={"Ngày cấp"}
                value={data.dateCreate}
                onChange={(e) =>
                  setData({ ...data, dateCreate: e.target.value })
                }
              />
            </div>
            <div className={cx("right")}>
              <div style={{ paddingTop: 16 }}>
                <label style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.7)" }}>
                  Khách hàng
                </label>
                <SelectBox
                  style={{ paddingTop: 6 }}
                  label={"Tất cả"}
                  type="normal"
                  select
                  onChange={(data) => setData({ ...data, customerId: data })}
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
            </div>
          </div>
        </div>
        <div className={cx("actions")}>
          <button disabled={loading} className={cx("btn")}>
            Đóng
          </button>
          <button
            disabled={loading}
            onClick={handleAdvice}
            className={cx("btn", "primary")}
          >
            {" "}
            Tạo mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormAdd;
