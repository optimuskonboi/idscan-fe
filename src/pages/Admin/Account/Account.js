import React from "react";
import { Table, Pagination, Toast } from "../../../components";
import classNames from "classnames/bind";
// import Filter from "./Filter/Filter";
import Filter from "../Customer/Filter/Filter";
import Info from "./Info/Info";
import FormAdd from "./FormAdd/FormAdd";
import styles from "./Account.module.css";
import { useEffect } from "react";
import axiosClient from "../../../services/axiosClient";
import { useState } from "react";

const cx = classNames.bind(styles);
const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [isFormAdd, setIsFormAdd] = useState(false);
  const [account, setAccount] = useState();
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefresh, setIsRefresh] = useState(false);
  const [loading,setLoading] = useState(false)
  const [textSearch, setTextSearch] = useState("");
  const colums = [
    {
      key: "stt",
      label: "STT",
    },
    {
      key: "username",
      label: "Tên tài khoản",
    },
    {
      key: "unit",
      label: "Khách hàng",
    },
    {
      key: "phone",
      label: "SĐT",
    },
    {
      key: "role",
      label: "Quyền",
    },
    {
      key: "status",
      label: "Trạng thái",
    },
  ];
  const data = accounts?.map((item, index) => {
    return {
      stt: index + 1,
  
      username: item.username,
      unit: item.customerName,
      phone: item.phoneNumber,
      role: item.role,
      id: item.username,
      status: <button className={cx("btn")}>Hoạt động</button>,
    };
  });
  const handleClick = (current) => {
    setCurrentPage(current);
  };
  const handleToggleFormAdd = () => {
    setAccount("");
    setIsFormAdd(!isFormAdd);
  };
  const onCloseInfo = () => {
    setIsShowInfo(!isShowInfo);
  };
  const getInfo = async (id) => {
    try {
      const res = await axiosClient.get(`/user?username=${id}`);
      setAccount(res);
      setIsShowInfo(!isShowInfo);
    } catch (e) {
      Toast.open("Lấy thông tin khách hàng không thành công", "danger");
    }
  };
  const handleAddAccount = async (data) => {
    try {
      setLoading(true)
      if (!account) {
        const res = await axiosClient.post("/user", data);
        if (res.code === 200) {
          Toast.open(res.message, "success");
          setIsFormAdd(!isFormAdd);
          setIsRefresh(!isRefresh);
        } else {
          Toast.open(res.message, "danger");
        }
      } else {
        const res = await axiosClient.put("/user", data);
        if (res.code === 200) {
          Toast.open(res.message, "success");
          setIsFormAdd(!isFormAdd);
          setIsRefresh(!isRefresh);
        } else {
          Toast.open(res.message, "danger");
        }
      }
      setLoading(false)

    } catch (e) {
      setLoading(false)

      Toast.open("Tạo user không thành công", "success");
    }
  };
  const handleEdit = () => {
    setIsShowInfo(!isShowInfo);
    setIsFormAdd(!isFormAdd);
  };
  useEffect(() => {
    async function getAccount() {
      try {
        const res = await axiosClient.get(
          `/user/search?page=${currentPage}&limit=10&keyword=${textSearch}`
        );
        setAccounts(res.data);
        if (res.total) {
          setPages(Math.ceil(res.total / 10));
        }
      } catch (e) {
        console.log(e);
      }
    }
    getAccount();
  }, [currentPage, isRefresh,textSearch]);
  return (
    <div className={cx("container")}>
      {/* <Customer/> */}
      {isShowInfo && (
        <Info onClose={onCloseInfo} onEdit={handleEdit} data={account} />
      )}
      {isFormAdd && (
        <FormAdd
          account={account}
          onAdd={handleAddAccount}
          onToggle={handleToggleFormAdd}
          loading={loading}
        />
      )}
      <div className={cx("header")}>
        <p>Quản lý tài khoản</p>
      </div>
      <div className={cx("content")}>
        <div className={cx("filter")}>
          <Filter onShowAdd={handleToggleFormAdd} setTextSearch={setTextSearch}/>
        </div>
        <div className={cx("data")}>
          <Table handleShow={getInfo} colum={colums} data={data} />
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

export default Account;
