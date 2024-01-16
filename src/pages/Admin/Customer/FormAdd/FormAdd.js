import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import {
  HeaderModal,
  InputTextBox,
  DateTimePicker,
  Toast,
} from "../../../../components";
import { Select, InputLabel, MenuItem, FormControl } from "@mui/material";

import { DeleteIcon, ShareIcon, PlusIcon } from "../../../../components/Icons";
import axiosClient from "../../../../services/axiosClient";
import { formatYYMMDD, isValidatorEmail,isValidatorPhone } from "../../../../utils";
import styles from "./FormAdd.module.css";

const cx = classNames.bind(styles);
const FormAdd = ({ onShowAdd, handleAdd, data, type, loading }) => {
  const [isChange, setIsChange] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    taxCode: "",
    contractNum: "",
    phoneNumber: "",
    address: "",
    startDate: "",
    endDate: "",
    status: 0,
    email: "",
  });
  const [devices, setDevices] = useState([
    {
      deviceId: "",
    },
  ]);
  const [devicesData, setDevicesData] = useState([]);
  const handleAddDevice = (index) => {
    setDevices([
      ...devices,
      {
        deviceId: "",
      },
    ]);
  };
  const handleRemoveDevice = (id) => {
    const data = devices.filter((item, index) => index + 1 !== id);
    setDevices(data);
  };
  const handleChange = (index, data) => {
    const deviceCopy = devices;
    deviceCopy[index] = {
      ...deviceCopy[index],
      deviceId: data,
    };
    setDevices(deviceCopy);
    setIsChange(!isChange);
  };
  const handleAddCustomer = () => {
    if (isValidatorEmail(info.email) && info.startDate <= info.endDate) {
      handleAdd({
        ...info,
        listDevices: devices,
      });
    } else if (!isValidatorEmail(info.email)) {
      Toast.open("Vui lòng nhập đúng trường email", "danger");
    } else if (info.startDate > info.endDate) {
      Toast.open("Chọn ngày bắt đầu nhỏ hơn ngày kết thúc", "danger");
    }
    else if(isValidatorPhone(info.phoneNumber)){
      Toast.open("Vui lòng nhập dúng định dạng của số điện thoại", "danger");

    }
  };
  useEffect(() => {
    async function getDevice() {
      try {
        const res = await axiosClient.get(
          `/devices/available?page=1&limit=10000`
        );
        setDevicesData(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    getDevice();
  }, []);
  useEffect(() => {
    if (data) {
      setInfo(data);
      if (data?.listDevices.length > 0) {
        setDevices(
          data?.listDevices
            ? data?.listDevices
            : [
                {
                  deviceId: "",
                },
              ]
        );
      }
    }
  }, [data]);
  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <HeaderModal onClose={onShowAdd} title={"Tạo mới khách hàng"} />
        <div className={cx("data")}>
          <h3 className={cx("title")}>Thông tin khách hàng</h3>
          <div className={cx("form")}>
            <div className={cx("left")}>
              <InputTextBox
                style={{ width: "49%" }}
                placeholder={"Nhập"}
                title={"Tên khách hàng"}
                value={info.name}
                onChange={(data) => setInfo({ ...info, name: data })}
              />
              <InputTextBox
                style={{ width: "49%" }}
                placeholder={"Nhập"}
                title={"Số điện thoại"}
                value={info.phoneNumber}
                onChange={(data) => setInfo({ ...info, phoneNumber: data })}
              />
              <InputTextBox
                style={{ width: "49%" }}
                placeholder={"Nhập"}
                title={"Email"}
                value={info.email}
                onChange={(data) => setInfo({ ...info, email: data })}
              />
              <InputTextBox
                placeholder={"Nhập"}
                style={{ width: "49%" }}
                title={"Mã số thuế"}
                value={info.taxCode}
                onChange={(data) => setInfo({ ...info, taxCode: data })}
              />
              <InputTextBox
                style={{ width: "49%" }}
                placeholder={"Nhập"}
                title={"Số hợp đồng"}
                value={info.contractNum}
                onChange={(data) => setInfo({ ...info, contractNum: data })}
              />
            </div>
            <InputTextBox
              style={{ width: "100%", paddingTop: 0, marginTop: 0 }}
              placeholder={"Nhập"}
              title={"Địa chỉ"}
              value={info.address}
              onChange={(data) => setInfo({ ...info, address: data })}
            />
            <div className={cx("date")}>
              <DateTimePicker
                styles={{ width: "100%" }}
                className={cx("item")}
                title={"Ngày bắt đầu"}
                value={formatYYMMDD(info.startDate)}
                onChange={(e) =>
                  setInfo({ ...info, startDate: e.target.value })
                }
              />
              <DateTimePicker
                styles={{ width: "100%" }}
                className={cx("item")}
                title={"Ngày kết thúc"}
                value={formatYYMMDD(info.endDate)}
                onChange={(e) => setInfo({ ...info, endDate: e.target.value })}
              />
            </div>
          </div>
          {!data?.listDevices?.length > 0  && (
            <>
              <h3 className={cx("title")}>Thiết bị</h3>
              {devices.map((item, index) => {
                return index === 0 ? (
                  <div className={cx("device")}>
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Thiết bị 1
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        label={`Thiết bị ${index + 1}`}
                        onChange={(e) => handleChange(index, e.target.value)}
                        value={item.deviceId}
                      >
                        {devicesData?.map((it, index) => (
                          <MenuItem value={it.deviceId}>
                            {it.serialNumber}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div
                      onClick={() => handleAddDevice(index + 1)}
                      className={cx("icon", "add")}
                    >
                      <PlusIcon />
                    </div>
                  </div>
                ) : (
                  <div className={cx("device")}>
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Thiết bị {index + 1}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        label={`Thiết bị ${index + 1}`}
                        onChange={(e) => handleChange(index, e.target.value)}
                        value={item.deviceId}
                      >
                        {devicesData?.map((it, index) => (
                          <MenuItem value={it.deviceId}>
                            {it.serialNumber}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div
                      onClick={() => handleRemoveDevice(index + 1)}
                      className={cx("icon", "delete")}
                    >
                      <DeleteIcon />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className={cx("actions")}>
          <button disabled={loading} onClick={onShowAdd} className={cx("btn")}>
            Hủy bỏ
          </button>
          <button
            disabled={loading}
            onClick={handleAddCustomer}
            className={cx("btn", "primary")}
          >
            {" "}
            {data ? "Cập nhập" : " Tạo mới"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormAdd;
