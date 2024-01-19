import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { HeaderModal, Toast, Loading } from "../../../components";
import img from "./../../../assets/images/Avatar.png";
import { formatDDMMYY } from "../../../utils";
import styles from "./Popup.module.css";
import axiosClient from "../../../services/axiosClient";
import axios from "axios";

const cx = classNames.bind(styles);
const Popup = ({ onClose, idCCCD, type, handleAddCCCD }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const ref = React.useRef(null);
  const handleClose = () => {
    onClose();
  };
  const handleAddCCCDs = async () => {
    try {
      const cccd = {
        ...data,
        dateScan: "2023-02-25T10:26:15.882Z",
        frontId: "string",
        backId: "string",
        status: 0,
      };
      const res = await axiosClient.post("/identity", data);
      if (res.code !== 400) {
        Toast.open("Thêm mới căn cước công dân thành công", "success");
        handleAddCCCD();
      } else {
        Toast.open(res.message, "danger");
      }
    } catch (e) {
      Toast.open("Thêm mới căn cước công dân không thành công", "danger");
    }
  };
  const exportWord = async (dataId, doc) => {
    try {
      const path =
        doc === "word"
          ? `/identity/export?id=${dataId}`
          : `/identity/exportpdf?id=${dataId}`;
      const res = await axiosClient.get(path);
      console.log(res);
      if (res.code === 200) {
        let a = document.createElement("a");
        a.href =
          doc === "word"
            ? `http://cccd1.cds.vinorsoft.com/api/v1/downloadFile/document/${res.data}`
            : `http://cccd1.cds.vinorsoft.com/api/v1/downloadFile/documentpdf/${res.data}`;
        a.click();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleRefresh = async () => {
    try {
      // Thông tin của CCCD
      setIsLoading(true);

      // if (type === "info") {
      //   const res = await axiosClient.get(`/identity?id=${idCCCD}`);
      //   //Cập nhập thông tin vào biến
      //   setData(res);
      // }
      //Lấy thông tin từ thiết bị

      const res = await axios.get(
        `http://localhost:63834/api/id/getdata?id=${idCCCD}&datelicense=${sessionStorage.getItem(
          "date"
        )}`
      );

      setData(res.data);
      setIsLoading(false);
    } catch (e) {
        setIsLoading(false)
        setError(true);
    }
  };
  useEffect(() => {
    async function getInfo() {
      try {
        // Thông tin của CCCD
        setIsLoading(true);

        if (type === "info") {
          const res = await axiosClient.get(`/identity?id=${idCCCD}`);
          //Cập nhập thông tin vào biến
          setData(res);
        }
        //Lấy thông tin từ thiết bị
        else {
          const res = await axios.get(
            `http://localhost:63834/api/id/getdata?id=${idCCCD}&datelicense=${sessionStorage.getItem(
              "date"
            )}`
          );
          setData(res.data);
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false)
        if (type !== "info") {
          setError(true);
        }
      }
    }
    getInfo();
  }, [idCCCD]);
  // React.useEffect(() => {
  //   const handleClickOutSide = (e) => {
  //     if (e.target === ref.current) {
  //       onClose();
  //     }
  //     console.log("a");
  //   };
  //   document.body.addEventListener("click", handleClickOutSide);
  //   return () => {
  //     document.body.addEventListener("click", handleClickOutSide);
  //   };
  // }, []);
  console.log(isLoading);
  return (
    <div ref={ref} className={cx("container")}>
      <div className={cx("content")}>
        <>
          <HeaderModal onClose={handleClose} title={"Thông tin CCCD"} />
          {isLoading ? (
            <div className={cx("loading")}>
              <Loading />
            </div>
          ) : (
            <>
              {error ? (
                <div className={cx("error-getdata")}>
                  Không đọc được dữ liệu. Vui lòng kiểm tra lại thiết bị
                </div>
              ) : (
                <div className={cx("info")}>
                  <div className={cx("avatar")}>
                    <div className={cx("avatar-title")}>Ảnh chân dung</div>
                    <img
                      src={"data:image/jpeg;base64," + data?.portraitImage}
                      alt="avatar"
                    />
                  </div>
                  <div className={cx("info-other")}>
                    <div className={cx("title-info")}>Thông tin</div>
                    <div className={cx("info-item")}>
                      <div className={cx("title")}>
                        Họ, chữ đệm tên khai sinh
                      </div>
                      <div className={cx("description")}>{data?.fullName}</div>
                    </div>
                    <div className={cx("info-item")}>
                      <div className={cx("title")}>Ngày sinh</div>
                      <div className={cx("description")}>
                        {formatDDMMYY(data?.dateOfBirth)}
                      </div>
                    </div>
                    <div className={cx("info-item")}>
                      <div className={cx("title")}>Giới tính</div>
                      <div className={cx("description")}>
                        {data?.sex === 0 ? "Nữ" : "Nam"}
                      </div>
                    </div>
                    <div className={cx("info-item")}>
                      <div className={cx("title")}>Quê quán</div>
                      <div className={cx("description")}>
                        {data?.placeOfOrigin}
                      </div>
                    </div>
                    <div className={cx("info-item")}>
                      <div className={cx("title")}>Dân tộc</div>
                      <div className={cx("description")}>{data?.ethnic}</div>
                    </div>
                    <div className={cx("info-item")}>
                      <div className={cx("title")}>Tôn giáo</div>
                      <div className={cx("description")}>{data?.religion}</div>
                    </div>
                    <div className={cx("info-item")}>
                      <div className={cx("title")}>Quốc tịch</div>
                      <div className={cx("description")}>Việt Nam</div>
                    </div>
                    <div className={cx("info-item")}>
                      <div className={cx("title")}>Nơi thường trú</div>
                      <div className={cx("description")}>
                        {data?.placeOfResidence}
                      </div>
                    </div>
                    <div className={cx("info-item")}>
                      <div className={cx("title")}>
                        Họ tên đệm và tên cha, mẹ, vợ hoặc chồng
                      </div>
                      <div
                        className={cx("description")}
                      >{`${data?.father}, ${data?.mother}, ${data?.mate}`}</div>
                    </div>
                    <div className={cx("info-item")}>
                      <div className={cx("title")}>Số chứng minh đã cấp</div>
                      <div className={cx("description")}>{data?.idNumber}</div>
                    </div>
                    <div className={cx("info-item")}>
                      <div className={cx("title")}>Ngày cấp</div>
                      <div className={cx("description")}>
                        {formatDDMMYY(data?.dateIssue)}
                      </div>
                    </div>
                    <div className={cx("info-item")}>
                      <div className={cx("title")}>Ngày hết hạn</div>
                      <div className={cx("description")}>
                        {formatDDMMYY(data?.dateExpired)}
                      </div>
                    </div>
                    <div className={cx("info-item")}>
                      <div className={cx("title")}>Đặc điểm nhận dạng</div>
                      <div className={cx("description")}>
                        {data?.identification}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className={cx("action")}>
                <div className={cx("refresh")}>
                  <button onClick={handleClose} className={cx("btn", "cancel")}>
                    Hủy bỏ
                  </button>
                  <button
                    onClick={handleRefresh}
                    className={cx("btn", "clear")}
                  >
                    Quét lại
                  </button>
                </div>
                {!error && (
                  <div className={cx("gap")}>
                    <button
                      onClick={() => exportWord(data?.dataId, "word")}
                      className={cx("btn", "add")}
                    >
                      {" "}
                      Xuất file word
                    </button>
                    {type === "info" ? (
                      <button
                        onClick={() => exportWord(data?.dataId, "pdf")}
                        className={cx("btn", "export")}
                      >
                        {" "}
                        Xuất PDF
                      </button>
                    ) : (
                      <button
                        onClick={handleAddCCCDs}
                        className={cx("btn", "add")}
                      >
                        {" "}
                        Thêm CCCD
                      </button>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default Popup;
