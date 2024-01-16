
import React from "react";
import classNames from "classnames/bind";
import styles from './Row.module.css';

const cx = classNames.bind(styles)
const Row = ({
  children,
  layout = 12,
  gap,
  style,
  ...props
}) => {
  

  return (
    <div
      {...props}
      style={{
        ...style,
        gap:
          gap && gap.length ? `${gap[0]}px ${gap[1] ? gap[1] + "px" : ""}` : 0,
      }}
      className={cx("row")}
    >
      {React.Children.map(children, (child, i) => {
        return React.cloneElement(child, {
          layout: layout,
          gap: gap,
          index: i + 1,
        });
      })}
    </div>
  );
};

export default Row;
