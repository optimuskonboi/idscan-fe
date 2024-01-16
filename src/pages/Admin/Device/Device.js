import React, { useEffect, useState } from "react";
import { Table, Pagination, Toast, Alert } from "../../../components";
import classNames from "classnames/bind";
// import Filter from "./Filter/Filter";
import Filter from "../Customer/Filter/Filter";
import Info from "./Info/Info";

import FormAdd from "./FormAdd/FormAdd";
import Customer from "./Customer/Customer";
import styles from "./Device.module.css";
import axiosClient from "../../../services/axiosClient";
import { formatDDMMYY,increYear } from "../../../utils";

const cx = classNames.bind(styles);
const Device = () => {
  const [devices, setDevices] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAlert, setIsAlert] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [device, setDevice] = useState();
  const [isCustomer, setIsCustomer] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [isFormAdd, setIsFormAdd] = useState(false);
  const [id, setId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [check, setCheck] = useState();
  const colums = [
    {
      key: "stt",
      label: "STT",
    },
    {
      key: "seri",
      label: "Serial",
    },
    {
      key: "unit",
      label: "Khách hàng",
    },
    {
      key: "date_start",
      label: "Ngày cấp",
    },
    {
      key: "date_end",
      label: "Hạn bảo hành",
    },
    {
      key: "status",
      label: "Trạng thái",
    },
    {
      key: "actions",
      label: "Thao tác",
    },
  ];

  const data = devices?.map((item, index) => {
    return {
      stt: index + 1,
      seri: item.serialNumber,
      unit: item.customerName ? item.customerName : "Không có",
      date_start: formatDDMMYY(item.dateCreate),
      date_end: increYear(item.dateCreate),
      actions: (
        <div>
          <span onClick={() => getDetail(item.deviceId)} className={cx("view")}>
            Xem
          </span>{" "}
          {item.status === 1 && (
            <span
              onClick={(e) => {
                setIsAlert(!isAlert);
                setId(item.deviceId);
              }}
              className={cx("delete")}
            >
              Xóa
            </span>
          )}
        </div>
      ),
      status: (
        <button className={cx("btn", item.status === 1 ? "on" : "not")}>
          {item.status === 1 ? "Hoạt động":item.status ===0?"Chưa gán" : "Ngưng sử dụng"}
        </button>
      ),
    };
  });
  const handleClick = (current) => {
    setCurrentPage(current);
  };
  const handleCheck = (id) => {
    setCheck(id);
  };
  const handleAddDevice = async (data) => {
    try {
      setIsLoading(true);
      const { serialNumber, dateCreate, dateRemove } = data;
      const value = data.customerId
        ? data
        : { serialNumber, dateCreate, dateRemove };
      const res = await axiosClient.post("/device", value);
      console.log(res);
      if (res.code === 200) {
        Toast.open(res.message, "success");
        setIsFormAdd(!isFormAdd);
      } else {
        Toast.open(res.message, "danger");
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  const onShowAdd = () => {
    setIsFormAdd(!isFormAdd);
  };
  const getAllCustomer = async () => {
    try {
      const res = await axiosClient.get(
        "/customers/all/search?page=1&limit=100000"
      );
      setCustomers(res.data);
      setIsInfo(!isInfo);
      setIsCustomer(!isCustomer);
    } catch (e) {
      console.log(e);
      Toast.open("Lấy danh sách khách hàng không thành công", "success");
    }
  };
  const onCloseInfo = () => {
    setIsInfo(!isInfo);
  };
  const onCloseCustomer = () => {
    setIsCustomer(!isCustomer);
  };
  const getDetail = async (id) => {
    try {
      const res = await axiosClient.get(`/device?id=${id}`);
      setDevice(res);
      setIsInfo(!isInfo);
    } catch (e) {
      console.log(e);
    }
  };
  const handleCustomer = async () => {
    try {
      if (check) {
        const res = await axiosClient.put("/device", {
          ...device,
          customerName:"Tùng",
          customerId: check,
        });
        if(res.code === 200){
          Toast.open("Thêm thiết bị cho khách hàng thành công","success")
          setIsCustomer(!isCustomer)
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleRemove = async () => {
    try {
      const res = await axiosClient.put(`/device/status?id=${id}&&status=-1`);
      if (res.code === 200) {
        Toast.open("Xóa thiết bị thành công", "success");
        setIsAlert(!isAlert);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    async function getDevice() {
      try {
        const res = await axiosClient.get(
          `/devices/all/search?page=${currentPage}&limit=10&keyword=${textSearch}`
        );
        setDevices(res.data);
        console.log(res);
        if (res.total) {
          setPages(Math.ceil(res.total / 10));
        }
      } catch (e) {
        console.log(e);
      }
    }
    getDevice();
  }, [isFormAdd, textSearch, currentPage]);

  return (
    <div className={cx("container")}>
      {isAlert && (
        <Alert
          onClose={() => setIsAlert(!isAlert)}
          onOk={handleRemove}
          title={"Bạn có muốn xóa thiết bị không"}
        />
      )}
      {isCustomer && (
        <Customer
          onClose={onCloseCustomer}
          handleAddCS={handleCustomer}
          customerId={check}
          onCheck={handleCheck}
          customer={customers}
        />
      )}
      {isInfo && (
        <Info
          onClose={onCloseInfo}
          getAllCustomer={getAllCustomer}
          data={device}
        />
      )}
      {isFormAdd && (
        <FormAdd
          onClose={onShowAdd}
          loading={isLoading}
          handleAdd={handleAddDevice}
        />
      )}
      <div className={cx("header")}>
        <p>Quản lý thiết bị</p>
      </div>
      <div className={cx("content")}>
        <div className={cx("filter")}>
          <Filter setTextSearch={setTextSearch} onShowAdd={onShowAdd} />
        </div>
        <div className={cx("data")}>
          <Table colum={colums} data={data} />
        </div>
        <div className={cx("pagination")}>
          <Pagination onClick={(data)=>setCurrentPage(data)} currentPage={currentPage} pages={pages} />
        </div>
      </div>
    </div>
  );
};

export default Device;
