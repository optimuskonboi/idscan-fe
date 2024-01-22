import React from "react";
import classNames from "classnames/bind";
import { HeaderModal } from "../../../../components";
import { formatDDMMYY, increYear } from "../../../../utils";
import {
  DeleteIcon,
  PlugIcon,
  ShareIcon,
  PlusIcon,
} from "../../../../components/Icons";
import styles from "./Info.module.css";
import axiosClient from "../../../../services/axiosClient";
// import PlusIcon from "../../../../components/Icons/PlusIcon";

const cx = classNames.bind(styles);
const Info = ({ data, getAllCustomer, onClose }) => {
  const handleDeleteDevice = async (id) => {
    try {
      const res = await axiosClient.put("/device", {
        deviceId: id,
        customerId: "",
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(data);
  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <HeaderModal onClose={onClose} title={"Thông tin thiết bị"} />
        <div className={cx("data")}>
          <div className={cx("item")}>
            <div className={cx("title")}>Trạng thái</div>
            <div className={cx("description")}>
              <button className={cx("status",data.status === 1 ? "on":"not")}>
                {data.status === 0 ? "Chưa sử dụng" : data.status === 1 ?"Hoạt động":"Ngưng sử dụng"}
              </button>
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("title")}>Serial</div>
            <div className={cx("description")}>{data.serialNumber}</div>
          </div>
          <div className={cx("item")}>
            <div className={cx("title")}>Ngày cấp</div>
            <div className={cx("description")}>
              {formatDDMMYY(data.dateCreate)}
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("title")}>Ngày hết hạn</div>
            <div className={cx("description")}>
              {increYear(data.dateCreate)}
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("title")}>Đơn vị sử dụng</div>
            <div className={cx("description")}>
              {data.customerName ? (
                <div className={cx("customer")}>
                  <span>{data.customerName}</span>
                  <span
                    onClick={() => handleDeleteDevice(data.deviceId)}
                    className={cx("icon")}
                  >
                    <DeleteIcon />
                  </span>
                  {/* <span className={cx("icon")}>
                    <ShareIcon />
                  </span> */}
                </div>
              ) : (
                <button onClick={getAllCustomer} className={cx("add")}>
                  <span className={cx("icon")}>
                    <PlusIcon />
                  </span>
                  <span>Thêm</span>
                </button>
              //  "Không có người dùng sử dụng thiết bị"
              )}
            </div>
          </div>
        </div>
        <div className={cx("actions")}>
          <button onClick={onClose} className={cx("btn")}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default Info;
