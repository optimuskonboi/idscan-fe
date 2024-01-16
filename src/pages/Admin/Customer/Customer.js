import React, { useEffect, useState } from "react";
import { Table, Pagination, Toast } from "../../../components";
import classNames from "classnames/bind";
import Filter from "./Filter/Filter";
import Info from "./Info/Info";

import FormAdd from "./FormAdd/FormAdd";
import styles from "./Customer.module.css";
import axiosClient from "../../../services/axiosClient";
import { formatDDMMYY } from "../../../utils";

const cx = classNames.bind(styles);
const Customer = () => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [isInfo, setIsInfo] = useState(false);
  const [customer, setCustomer] = useState();
  // const [isRefresh,setIsRefresh] = useState(false)
  const [textSearch, setTextSearch] = useState("");
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const colums = [
    {
      key: "stt",
      label: "STT",
    },
    {
      key: "name",
      label: "Tên khách hàng",
    },
    {
      key: "taxCode",
      label: "Mã số thuế",
    },
    {
      key: "address",
      label: "Địa chỉ",
    },
    {
      key: "phone",
      label: "Số điện thoại",
    },
    {
      key: "number",
      label: "Số HD",
    },
    {
      key: "device",
      label: "Thiết bị",
    },
    // {
    //   key: "time",
    //   label: "Bắt đầu/ Kết thúc",
    // },
    // {
    //   key: "status",
    //   label: "Trạng thái",
    // },
  ];

  const data = customers?.map((item, index) => {
    return {
      stt: index + 1,
      name: item.name,
      number: item.contractNum,
      address: item.address,
      phone: item.phoneNumber,
      taxCode: item.taxCode,
      device: item.countDevices,
      time: formatDDMMYY(item.startDate) + " / " + formatDDMMYY(item.endDate),
      status: (
        <button className={cx("btn", item.status === 1 ? "on" : "not")}>
          {item.status === 1 ? "Hoạt động" : "Không hoạt động"}
        </button>
      ),
      id: item.customerId,
    };
  });
  const handleClick = (current) => {
    setCurrentPage(current);
  };
  const handleShowAdd = () => {
    if (!loading) {
      setIsShowAdd(!isShowAdd);
      setCustomer("");
    }
  };
  const handleAddCustomer = async (data) => {
    try {
      setLoading(true);
      if (!customer) {
        const res = await axiosClient.post("/customer", data);
        if (res.code === 400) {
          Toast.open("Thêm mới khách hàng thành công", "success");
        }
      } else {
        const res = await axiosClient.put("/customer", data);
        if (res.code === 200) {
          Toast.open("Chỉnh sửa khách hàng thành công", "success");
          setIsShowAdd(false);
        }
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  const handleShowInfo = async (id) => {
    try {
      const res = await axiosClient.get(`/customer?id=${id}`);
      setCustomer(res);
      setIsInfo(true);
    } catch (e) {
      Toast.open(
        "Lây thông tin chi tiết khách hàng không thàng công",
        "danger"
      );
    }
  };
  useEffect(() => {
    async function getCustomer() {
      try {
        const res = await axiosClient.get(
          `/customers/all/search?page=${currentPage}&limit=10&keyword=${textSearch}`
        );
        setCustomers(res.data);
        if (res.total) {
          setPages(Math.ceil(res.total / 10));
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (!isShowAdd) {
      getCustomer();
    }
  }, [isShowAdd, isInfo, currentPage, textSearch]);
  const handleShowEdit = () => {
    setIsInfo(!isInfo);
    setIsShowAdd(!isShowAdd);
  };
  return (
    <div className={cx("container")}>
      {isInfo && (
        <Info
          handleShowEdit={handleShowEdit}
          isRefresh={isInfo}
          setIsRefresh={setIsInfo}
          data={customer}
        />
      )}
      {isShowAdd && (
        <FormAdd
          data={customer}
          handleAdd={handleAddCustomer}
          onShowAdd={handleShowAdd}
          loading={loading}
        />
      )}
      <div className={cx("header")}>
        <p>Thông tin khách hàng</p>
      </div>
      <div className={cx("content")}>
        <div className={cx("filter")}>
          <Filter setTextSearch={setTextSearch} onShowAdd={handleShowAdd} />
        </div>
        <div className={cx("data")}>
          <Table handleShow={handleShowInfo} colum={colums} data={data} />
        </div>
        <div className={cx("pagination")}>
          <Pagination
            currentPage={currentPage}
            pages={pages}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Customer;
