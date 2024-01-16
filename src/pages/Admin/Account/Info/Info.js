import React from "react";
import classNames from "classnames/bind";
import { HeaderModal } from "../../../../components";
import { DeleteIcon, ShareIcon } from "../../../../components/Icons";
import styles from "./Info.module.css";

const cx = classNames.bind(styles);
const Info = ({data,onEdit,onClose}) => {
  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <HeaderModal onClose={onClose} title={"Thông tin tài khoản"} />
        <div className={cx("data")}>
          <div className={cx("item")}>
            <div className={cx("title")}>Trạng thái</div>
            <div className={cx("description")}>
              <button className={cx("status")}>{data.status===1?"Hoạt động":"Không hoạt động"}</button>
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("title")}>Khách hàng</div>
            <div className={cx("description")}>{data.fullname}</div>
          </div>
          <div className={cx("item")}>
            <div className={cx("title")}>Username</div>
            <div className={cx("description")}>{data.username}</div>
          </div>
          <div className={cx("item")}>
            <div className={cx("title")}>Email</div>
            <div className={cx("description")}>{data.email}</div>
          </div>
          <div className={cx("item")}>
            <div className={cx("title")}>Số điện thoại</div>
            <div className={cx("description")}>{data.phoneNumber}</div>
          </div>
          <div className={cx("item")}>
            <div className={cx("title")}>Quyền</div>
            <div className={cx("description")}>{data.role}</div>
          </div>
        </div>
        <div className={cx("actions")}>
          <button onClick={onClose} className={cx("btn")}>Đóng</button>
          <button onClick={onEdit} className={cx("btn","primary")}>Chỉnh sửa</button>
        </div>
      </div>
    </div>
  );
};

export default Info;
