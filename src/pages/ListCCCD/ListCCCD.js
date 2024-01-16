import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import {
  InputTextBox,
  SelectBox,
  Table,
  Button,
  Pagination,
  SelectBoxItem,
} from "../../components";
import axiosClient from "../../services/axiosClient";
import { formatDDMMYY, isValidatorCCCD } from "../../utils";
import Popup from "./Popup/Popup";
import styles from "./ListCCCD.module.css";
import FormEnterCCCD from "./Popup/FormEnterCCCD";

const cx = classNames.bind(styles);
const ListCCCD = () => {
  const [list, setList] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [input, setInput] = useState("");
  const [type, setType] = useState("");
  const [idCCCD, setIdCCCD] = useState();
  const [pages, setPages] = useState(1);
  const [typeSearch, setTypeSearch] = useState(0);
  const [textSearch, setTextSearch] = useState("");
  const ref = React.useRef();
  const colums = [
    {
      key: "STT",
      label: "STT",
    },
    {
      key: "ID",
      label: "ID",
    },
    {
      key: "name",
      label: "Họ và tên",
    },
    // {
    //   key: "phone",
    //   label: "Số điện thoại",
    // },
    {
      key: "birth",
      label: "Ngày sinh",
    },
    {
      key: "sex",
      label: "Giới tính",
    },
    {
      key: "address",
      label: "Quê quán",
    },
    {
      key: "date",
      label: "Ngày cập",
    },
    {
      key: "date_end",
      label: "Ngày hết hạn",
    },
    {
      key: "live",
      label: "Nơi thường trú",
    },
  ];
  const handleShowInfo = (id) => {
    setType("info");
    setIsShowInfo(true);
    setIdCCCD(id);
  };
  const data = list?.map((item, index) => {
    return {
      STT: index + 1,
      ID: item.idNumber,
      name: item.fullName,
      // phone: "0987116942",
      birth: formatDDMMYY(item.dateOfBirth),
      sex: item.sex === 0 ? "Nữ" : "Nam",
      address: item.placeOfOrigin,
      date: formatDDMMYY(item.dateIssue),
      date_end: formatDDMMYY(item.dateExpired),
      live: item.placeOfResidence,
      id: item.dataId,
    };
  });
  const onChangeCurrentPage = (data) => {
    setCurrentPage(data);
  };
  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleClose = () => {
    setShow(false);
    setIsShowInfo(false);
  };
  const handleDownload = () => {

      let a = document.createElement("a");
      a.href =`http://42.96.40.237:18002/api/v1/downloadFile/client/CCCD_Client.exe`
         
      a.click();

 
  };

  const handleGetInfo = (id) => {
    setIdCCCD(id);
    setShow(false);
    setIsShowInfo(true);
  };
  const handleAddCCCD = () => {
    setIsRefresh(!isRefresh);
    setShow(false);
    setIsShowInfo(true);
  };
  const onChanges = (data) => {
    // console.log(e);
    const value = data;
    setInput(value);
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      setTextSearch(value);
    }, 300);
  };
  useEffect(() => {
    async function getListCCD() {
      try {
        const res = await axiosClient.get(
          `/identities/search?page=${currentPage}&limit=10&type=${typeSearch}&keyword=${textSearch}`
        );
        setList(res.data);
        if (res.count) {
          setPages(Math.ceil(res.count / 10));
        }
      } catch (e) {
        console.log(e);
      }
    }
    getListCCD();
  }, [currentPage, isRefresh, typeSearch, textSearch]);
  return (
    <>
      {show ? (
        <FormEnterCCCD onGetInfo={handleGetInfo} onClose={handleClose} />
      ) : isShowInfo ? (
        <Popup
          type={type}
          idCCCD={idCCCD}
          onClose={handleClose}
          handleAddCCCD={handleAddCCCD}
        />
      ) : (
        <></>
      )}
      <div className={cx("content")}>
        <div className={cx("header")}>
          <div className={cx("item", "active")}>Danh sách CCCD</div>
          <div className={cx("item")}>Danh sách đầu lọc thẻ</div>
        </div>
        <div className={cx("filter")}>
          <div className={cx("data")}>
            <SelectBox
              style={{ paddingTop: 22 }}
              label={"Tất cả"}
              type="normal"
              select
            >
              <SelectBoxItem value={0} label={"Tất cả"} />
              <SelectBoxItem value={1} label={"Số CCCD"} />
              <SelectBoxItem value={2} label={"Tên"} />
              <SelectBoxItem value={3} label={"Nơi sinh"} />
              <SelectBoxItem value={4} label={"Nơi ở"} />
            </SelectBox>
            <InputTextBox
              onChange={onChanges}
              value={input}
              className={cx("input")}
              type="text"
              placeholder="Tìm kiếm"
            />

            {/* <SelectBox
              style={{ paddingTop: 22 }}
              label={"Quận/Huyện"}
              type="normal"
              select
            />
            <SelectBox
              style={{ paddingTop: 22 }}
              label={"Khu vực"}
              type="normal"
              select
            /> */}
          </div>
          <div className={cx("btn")}>
            <Button
              title={"Download bản desktop"}
              onClick={handleDownload}
              className={cx("bt")}
            />
          </div>
        </div>
        <div className={cx("table")}>
          <Table colum={colums} data={data} handleShow={handleShowInfo} />
        </div>
        <div className={cx("pagination")}>
          <Pagination
            currentPage={currentPage}
            pages={pages}
            onClick={onChangeCurrentPage}
            onNext={onPrevious}
            onPrevious={onPrevious}
          />
        </div>
      </div>
    </>
  );
};

export default ListCCCD;
