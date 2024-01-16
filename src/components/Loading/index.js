
import React from "react";
import classNames from "classnames/bind";
import styles from "./Loading.module.css";

const cx = classNames.bind(styles)
const Loading = ({
  color = "primary",
  children,
  size = 2,
  width = 35,
}) => {
  return (
    <div
      style={{
        width: `${width * Math.sqrt(2)}px`,
        height: `${width * Math.sqrt(2)}px`,
      }}
      className={cx("container")}
    >
      <div
        style={{
          width: `${width}px`,
          height: `${width}px`,
          borderWidth: `${size}px`,
        }}
        className={cx("loading",color)}
      ></div>
      <div style={{ position: "absolute" }}>{children}</div>
    </div>
  );
};

export default Loading;
