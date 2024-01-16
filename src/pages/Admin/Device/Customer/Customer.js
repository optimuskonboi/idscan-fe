import React from "react";
import classNames from "classnames/bind";
import { HeaderModal, Table } from "../../../../components";
import { formatDDMMYY } from "../../../../utils";
import styles from "./Customer.module.css";

const cx = classNames.bind(styles);
const Customer = ({ customer,onClose,onCheck,customerId,handleAddCS }) => {
  const handleAdd = ()=>{
    handleAddCS()
  }
  const handleCheck = (e,id)=>{
    console.log(e.target.value);
    if(e.target.value){
      onCheck(id)
    }
    else{
      onCheck('')
    }
  }
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
    // {
    //   key: "phone",
    //   label: "Số điện thoại",
    // },
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
    {
      key: "time",
      label: "Bắt đầu/ Kết thúc",
    },
    {
      key: "status",
      label: "Trạng thái",
    },
    {
      key:"checkbox",
      label:"Lựa chọn"
    },
  ];
  const data = customer?.map((item, index) => {
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
      checkbox: <input onChange={(e)=>handleCheck(e,item.customerId)} checked={item.customerId===customerId?true:false} type="checkbox"/>,
    };
  });
  // const data = [
  //   {
  //     stt: <input type="checkbox"/>,
  //     name: "Nguyễn Văn A",
  //     id: "1923981203",
  //     address: "Quận Cầu Giấy, Hà Nội",
  //     phone: "0979163596",
  //     number: "1923981203",
  //     device: "3",
  //     time: "20/06/2023 - 20/06/2024",
  //     status: <button className={cx("status")}>Hoạt động</button>,
  //   },
  //   {
  //     stt: <input type="checkbox"/>,
  //     name: "Nguyễn Văn A",
  //     id: "1923981203",
  //     address: "Quận Cầu Giấy, Hà Nội",
  //     phone: "0979163596",
  //     number: "1923981203",
  //     device: "3",
  //     time: "20/06/2023 - 20/06/2024",
  //     status: <button className={cx("status")}>Hoạt động</button>,
  //   },
  //   {
  //     stt: <input type="checkbox"/>,
  //     name: "Nguyễn Văn A",
  //     id: "1923981203",
  //     address: "Quận Cầu Giấy, Hà Nội",
  //     phone: "0979163596",
  //     number: "1923981203",
  //     device: "3",
  //     time: "20/06/2023 - 20/06/2024",
  //     status: <button className={cx("status")}>Hoạt động</button>,
  //   },
  //   {
  //     stt: <input type="checkbox"/>,
  //     name: "Nguyễn Văn A",
  //     id: "1923981203",
  //     address: "Quận Cầu Giấy, Hà Nội",
  //     phone: "0979163596",
  //     number: "1923981203",
  //     device: "3",
  //     time: "20/06/2023 - 20/06/2024",
  //     status: <button className={cx("status")}>Hoạt động</button>,
  //   },
  //   {
  //     stt: <input type="checkbox"/>,
  //     name: "Nguyễn Văn A",
  //     id: "1923981203",
  //     address: "Quận Cầu Giấy, Hà Nội",
  //     phone: "0979163596",
  //     number: "1923981203",
  //     device: "3",
  //     time: "20/06/2023 - 20/06/2024",
  //     status: <button className={cx("status")}>Hoạt động</button>,
  //   },
  // ];
  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <HeaderModal onClose={onClose} title={"Thêm thiết bị mới"} />
        <div className={cx("data")}>
          <Table data={data} colum={colums} />
        </div>
        <div className={cx("actions")}>
          <button onClick={onClose} className={cx("btn")}>Đóng</button>
          <button onClick={handleAdd} className={cx("btn", "primary")}> Tạo mới</button>
        </div>
      </div>
    </div>
  );
};

export default Customer;
