
import React from 'react'
import classNames from 'classnames/bind';
import styles from "./Skeleton.module.css";

const cx = classNames.bind(styles)
const Skeleton = ({
  width = "100%",
  height = "100%",
  borderRadius = 5,
  style,
  className = "",
}) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
        ...style,
      }}
      className={cx("wrapper",className)}
    ></div>
  );
};

export default Skeleton;
