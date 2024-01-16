import React from "react";
import classNames from "classnames/bind";
import { HeaderModal, Toast, Alert } from "../../../../components";
import { DeleteIcon, ShareIcon } from "../../../../components/Icons";
import styles from "./Info.module.css";
import { formatDDMMYY } from "../../../../utils";
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../../../../services/axiosClient";

const cx = classNames.bind(styles);
const Info = ({ data, isRefresh, setIsRefresh, handleShowEdit }) => {
  const [devices, setDevices] = useState([]);
  const [isAlert, setIsAlert] = useState(false);
  const [id, setId] = useState();
  const handleRemove = async () => {
    try {
      const data1 = devices.filter((item) => {
        return item.deviceId !== id;
      });
      console.log(data1);
      const res = await axiosClient.put(`/customer`, {
        ...data,
        listDevices: data1,
      });
      setIsAlert(!isAlert);
      setIsRefresh(!isRefresh);
      if (res.code) {
        Toast.open("Xóa thiết bị của khách hàng thành công", "success");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setDevices(data.listDevices);
  }, [data]);
  return (
    <>
      <div className={cx("container")}>
        {isAlert ? (
          <Alert
            title={"Bạn có muốn xóa thiết bị không"}
            onClose={() => {
              setIsAlert(!isAlert);
            }}
            onOk={handleRemove}
          />
        ) : (
          <div className={cx("content")}>
            <HeaderModal
              onClose={() => setIsRefresh(!isRefresh)}
              title={"Khách hàng Nguyễn Văn A"}
            />
            <div className={cx("data")}>
              <div className={cx("item")}>
                <div className={cx("title")}>Trạng thái</div>
                <div className={cx("description")}>
                  {data.status === 1 ? "Hoạt động" : "Không hoạt động"}
                </div>
              </div>
              <div className={cx("item")}>
                <div className={cx("title")}>Tên khách hàng</div>
                <div className={cx("description")}>{data.name}</div>
              </div>
              <div className={cx("item")}>
                <div className={cx("title")}>Số điện thoại</div>
                <div className={cx("description")}>{data.phoneNumber}</div>
              </div>
              <div className={cx("item")}>
                <div className={cx("title")}>Mã hợp đồng</div>
                <div className={cx("description")}>{data.contractNum}</div>
              </div>
              <div className={cx("item")}>
                <div className={cx("title")}>Mã số thuế</div>
                <div className={cx("description")}>{data.taxCode}</div>
              </div>
              <div className={cx("item")}>
                <div className={cx("title")}>Địa chỉ</div>
                <div className={cx("description")}>{data.address}</div>
              </div>
              <div className={cx("item")}>
                <div className={cx("title")}>Ngày bắt đầu</div>
                <div className={cx("description")}>
                  {formatDDMMYY(data.startDate)}
                </div>
              </div>
              <div className={cx("item")}>
                <div className={cx("title")}>Ngày kết thúc</div>
                <div className={cx("description")}>
                  {formatDDMMYY(data.endDate)}
                </div>
              </div>
              <div className={cx("item")}>
                <div className={cx("title")}>Thiệt bị</div>
                <div className={cx("description")}>
                  {data.listDevices
                    ? data?.listDevices?.map((item, index) => {
                        return (
                          <div className={cx("use")}>
                            <p>ID:{item.serialNumber}</p>
                            <span
                              onClick={() => {
                                setIsAlert(!isAlert);
                                setId(item.deviceId);
                              }}
                              style={{ paddingTop: 4 }}
                            >
                              <DeleteIcon />
                            </span>
                            {/* <span style={{ paddingTop: 4 }}>
                    <ShareIcon />
                  </span> */}
                          </div>
                        );
                      })
                    : "Chưa có thiết bị"}
                </div>
              </div>
            </div>
            <div className={cx("actions")}>
              <button
                onClick={() => setIsRefresh(!isRefresh)}
                className={cx("btn")}
              >
                Hủy bỏ
              </button>
              <button onClick={handleShowEdit} className={cx("btn", "primary")}>
                {" "}
                Chỉnh sửa
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Info;
